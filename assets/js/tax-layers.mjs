import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import { mountTaxLayers } from "./tax-layers-scene.mjs";

const container = document.querySelector("#tax-layers-scene");
const list = document.querySelector("#tax-layers-list");
const detail = document.querySelector("#tax-layers-detail");

if (container && list) {
  mountTaxLayers(container, list, detail, {
    THREE,
    OrbitControls,
    CSS2DRenderer,
    CSS2DObject,
  });
}
