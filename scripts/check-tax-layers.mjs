// Frame and layer checks for the place stack.
// Run: node scripts/check-tax-layers.mjs

const THREE = await import(
  process.env.TAX_LAYERS_THREE ||
    "/tmp/tax-layers-three/node_modules/three/build/three.module.js"
);
import { GROUPS, TAXES, bandHeight, taxesInGroup } from "../assets/js/tax-layers-model.mjs";
import { buildWorld, labelAnchor } from "../assets/js/tax-layers-scene.mjs";

const failures = [];
function check(name, ok) {
  if (!ok) failures.push(name);
  else console.log("ok", name);
}

check("four layers", GROUPS.map((group) => group.id).join(",") === "federal,state,local,other");
check("every tax names a layer", TAXES.every((tax) => GROUPS.some((group) => group.id === tax.group)));
check("federal is wider than other", GROUPS[0].radius > GROUPS[3].radius);
check("bands rise federal to other", bandHeight("federal") < bandHeight("state") && bandHeight("state") < bandHeight("local") && bandHeight("local") < bandHeight("other"));
check("sketches are marked", ["payroll", "voter-debt", "assessments", "service-fees"].every((id) => TAXES.find((tax) => tax.id === id).sketch));
check("sourced rows point at the inventory", ["federal-income", "property-general", "local-sales", "lodging"].every((id) => TAXES.find((tax) => tax.id === id).inventory));

const world = buildWorld(THREE);
world.root.updateMatrixWorld(true);

const house = new THREE.Box3().setFromObject(world.place);
check("the place stands up", house.max.y > 0.8 && house.min.y >= -0.01);

let previousY = -1;
let previousRadius = Infinity;
for (const group of GROUPS) {
  const band = world.bands[group.id];
  const box = new THREE.Box3().setFromObject(band);
  check(`${group.id} band is flat and above the last`, box.max.y > previousY && box.max.y - box.min.y < 0.2);
  previousY = box.max.y;
  const reach = Math.max(Math.abs(box.min.x), Math.abs(box.max.x));
  check(`${group.id} band is inside the wider layer`, reach < previousRadius + 0.05);
  previousRadius = reach;
  const anchor = labelAnchor(group.id);
  check(`${group.id} label sits east of the band`, anchor[0] > reach);
}

const other = new THREE.Box3().setFromObject(world.bands.other);
check("the place sits inside the innermost layer", house.max.x < other.max.x && house.min.x > other.min.x);

check("each layer has at least one tax", GROUPS.every((group) => taxesInGroup(group.id).length > 0));

if (failures.length) {
  console.error("failed:", failures.join(", "));
  process.exit(1);
}
console.log("tax-layers checks passed");
