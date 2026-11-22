import { GROUPS, PLACE, TAXES, bandHeight, taxById, taxesInGroup } from "./tax-layers-model.mjs";

// RingGeometry lies in XY. rotation.x = -π/2 lays the band flat, facing +y.
const FLAT_ROTATION_X = -Math.PI / 2;

export function buildWorld(THREE) {
  const root = new THREE.Group();
  root.name = "place-layers";

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(6.5, 64),
    new THREE.MeshLambertMaterial({ color: 0xe2e8f0, side: THREE.DoubleSide }),
  );
  ground.rotation.x = FLAT_ROTATION_X;
  ground.position.y = -0.02;
  ground.name = "ground";
  root.add(ground);

  const place = placeObject(THREE);
  root.add(place);

  const bands = {};
  for (const group of GROUPS) {
    const band = new THREE.Mesh(
      new THREE.RingGeometry(group.radius - 0.28, group.radius, 80),
      new THREE.MeshLambertMaterial({
        color: group.color,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    band.rotation.x = FLAT_ROTATION_X;
    band.position.y = bandHeight(group.id);
    band.name = `band-${group.id}`;
    band.userData.group = group.id;
    root.add(band);
    bands[group.id] = band;
  }

  return { root, place, bands };
}

function placeObject(THREE) {
  const group = new THREE.Group();
  group.name = "place";

  const lot = new THREE.Mesh(
    new THREE.BoxGeometry(2.1, 0.06, 2.1),
    new THREE.MeshLambertMaterial({ color: 0xcbd5e1 }),
  );
  lot.position.y = 0.03;

  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(0.82, 0.7, 0.7),
    new THREE.MeshLambertMaterial({ color: 0xf8fafc }),
  );
  walls.position.y = 0.41;

  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(0.62, 0.42, 4),
    new THREE.MeshLambertMaterial({ color: 0x4f46e5 }),
  );
  roof.position.y = 0.95;
  roof.rotation.y = Math.PI / 4;

  group.add(lot, walls, roof);
  return group;
}

export function labelAnchor(groupId) {
  const group = GROUPS.find((item) => item.id === groupId);
  return [group.radius + 0.25, bandHeight(groupId), 0];
}

export function mountTaxLayers(container, listEl, detail, deps) {
  const { THREE, OrbitControls, CSS2DRenderer, CSS2DObject } = deps;
  const world = buildWorld(THREE);
  container.replaceChildren();

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0xf8fafc, 1);
  container.appendChild(renderer.domElement);

  const labels = new CSS2DRenderer();
  labels.domElement.style.position = "absolute";
  labels.domElement.style.inset = "0";
  labels.domElement.style.pointerEvents = "none";
  container.appendChild(labels.domElement);

  const scene = new THREE.Scene();
  scene.add(world.root);
  scene.add(new THREE.HemisphereLight(0xeef2ff, 0xe2e8f0, 1.1));
  const sun = new THREE.DirectionalLight(0xffffff, 1.1);
  sun.position.set(6, 10, 8);
  scene.add(sun);

  const labelNodes = {};
  for (const group of GROUPS) {
    const el = document.createElement("div");
    el.className = "tax-layer-label";
    el.textContent = group.name;
    const obj = new CSS2DObject(el);
    const anchor = labelAnchor(group.id);
    obj.position.set(anchor[0], anchor[1], anchor[2]);
    scene.add(obj);
    labelNodes[group.id] = el;
  }

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
  const target = new THREE.Vector3(0, 0.85, 0);
  camera.position.set(5.6, 2.8, 6.6);
  camera.lookAt(target);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(target);
  controls.enableDamping = true;
  controls.maxPolarAngle = Math.PI / 2 - 0.06;
  controls.minDistance = 4;
  controls.maxDistance = 22;
  controls.update();

  const buttons = renderList(listEl);
  let selectedId = null;

  function paintBands(id) {
    const selected = id ? taxById(id) : null;
    for (const group of GROUPS) {
      const band = world.bands[group.id];
      const count = taxesInGroup(group.id).length;
      if (selected && selected.group === group.id) {
        band.material.opacity = 0.92;
        labelNodes[group.id].textContent = selected.name;
      } else {
        band.material.opacity = selected ? 0.22 : 0.55;
        labelNodes[group.id].textContent = `${group.name} · ${count}`;
      }
    }
  }

  function select(id) {
    selectedId = id;
    const tax = id ? taxById(id) : null;
    for (const button of buttons) {
      const on = button.dataset.tax === id;
      button.setAttribute("aria-current", on ? "true" : "false");
    }
    paintBands(id);
    if (!detail) return;
    detail.replaceChildren();
    const title = document.createElement("p");
    title.className = "font-semibold text-slate-900";
    title.textContent = tax ? tax.name : PLACE.name;
    const body = document.createElement("p");
    body.className = "mt-1 text-slate-700";
    body.textContent = tax
      ? tax.note
      : "Choose a tax. Its name moves onto that layer of the place.";
    detail.append(title, body);
    if (tax && tax.inventory) {
      const link = document.createElement("a");
      link.href = tax.inventory;
      link.className = "mt-2 inline-block text-sm font-semibold text-indigo-700 underline decoration-indigo-300";
      link.textContent = "Inventory record";
      detail.append(link);
    }
  }

  for (const button of buttons) {
    button.addEventListener("click", () => {
      const current = button.getAttribute("aria-current") === "true";
      select(current ? null : button.dataset.tax);
    });
  }

  listEl.querySelectorAll("[data-group-toggle]").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const groupId = toggle.dataset.groupToggle;
      const band = world.bands[groupId];
      band.visible = !band.visible;
      labelNodes[groupId].style.visibility = band.visible ? "visible" : "hidden";
      toggle.setAttribute("aria-pressed", band.visible ? "true" : "false");
      toggle.textContent = band.visible ? "Hide" : "Show";
      const section = toggle.closest("section");
      if (section) section.classList.toggle("is-hidden", !band.visible);
      paintBands(selectedId);
    });
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function onClick(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(Object.values(world.bands), false);
    const hit = hits.find((item) => item.object.visible);
    if (!hit) return;
    const groupId = hit.object.userData.group;
    const first = taxesInGroup(groupId)[0];
    if (first) select(first.id);
  }
  renderer.domElement.addEventListener("click", onClick);

  function resize() {
    const width = container.clientWidth || 640;
    const height = container.clientHeight || 480;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    labels.setSize(width, height);
  }
  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(container);

  paintBands(null);
  let frame = 0;
  function draw() {
    frame = requestAnimationFrame(draw);
    controls.update();
    renderer.render(scene, camera);
    labels.render(scene, camera);
  }
  draw();

  return {
    select,
    stop() {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener("click", onClick);
      controls.dispose();
      renderer.dispose();
    },
  };
}

function renderList(listEl) {
  listEl.replaceChildren();
  const buttons = [];
  for (const group of GROUPS) {
    const section = document.createElement("section");
    section.className = "mb-4";
    const head = document.createElement("div");
    head.className = "mb-1 flex items-center justify-between";
    const title = document.createElement("h3");
    title.className = "text-xs font-semibold uppercase tracking-wide text-slate-500";
    const swatch = document.createElement("span");
    swatch.className = "tax-layer-swatch";
    swatch.style.backgroundColor = `#${group.color.toString(16).padStart(6, "0")}`;
    swatch.setAttribute("aria-hidden", "true");
    title.append(swatch, document.createTextNode(group.name));
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.dataset.groupToggle = group.id;
    toggle.setAttribute("aria-pressed", "true");
    toggle.className = "text-xs font-medium text-slate-500 underline decoration-slate-300";
    toggle.textContent = "Hide";
    head.append(title, toggle);
    const list = document.createElement("ul");
    list.className = "divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white";
    for (const tax of taxesInGroup(group.id)) {
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.tax = tax.id;
      button.setAttribute("aria-current", "false");
      button.className = "flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm text-slate-800 aria-current:bg-indigo-50";
      const name = document.createElement("span");
      name.textContent = tax.name;
      button.append(name);
      if (tax.sketch) {
        const badge = document.createElement("span");
        badge.className = "shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-950";
        badge.textContent = "Sketch";
        button.append(badge);
      }
      item.append(button);
      list.append(item);
      buttons.push(button);
    }
    section.append(head, list);
    listEl.append(section);
  }
  return buttons;
}
