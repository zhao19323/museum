import "./index.less";
import * as THREE from "three";
import VRHall from "./vrhall";
// import VRHall from "../dist/lib/vrhall.es.js";
import { data } from "./pictures2";
import Zoomtastic from "zoomtastic";

import * as m from "./materls";

window.onload = function () {
  // 实例化
  const vr = new VRHall({
    debugger: false, // 开启调试模式
    maxSize: 20, // 画框最大尺寸
    movieHight: 2, // 移动的高度
    container: document.getElementById("root"),
    cameraOption: {
      position: { x: 16.928, y: 2, z: 0.699 },
      lookAt: { x: 30.551, y: 2, z: 1.096 },
    },
    onClick: (item) => {
      console.log("你点击了", item);
      if (item.url) {
        Zoomtastic.show(item.url);
      }
     //alert(JSON.stringify(item.desc, null, 2));
    },
  });

  Zoomtastic.mount();

  // 加载厅模型
  vr.loadHall({
    url: "./assets/room2/dm.glb",
    planeName: "dm", // plane , meishu01
    // position: { x: 2, y: -0.2, z: 2 },
    position: { x: 0, y: 0, z: 0 },
    scale: 1,
    onProgress: (p) => {
      console.log("加载进度", p);
    },
  }).then((gltf) => {
    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        // ...
      }

      // if (child.material) {
      //   child.material.emissiveMap = child.material.map;
      // }
    });
    
    const dm_OBJ = gltf.scene.getObjectByName("dm");
    dm_OBJ.material = m.dm_M;
    const dm2_OBJ = gltf.scene.getObjectByName("dm2");
    dm2_OBJ.material = m.wall_M;
    const qiang5_OBJ = gltf.scene.getObjectByName("qiang5");
    qiang5_OBJ.material = m.qiang5_M;
    const huaqiang1_OBJ = gltf.scene.getObjectByName("huaqiang1");
    huaqiang1_OBJ.material = m.huaqiang1_M;
    const huaqiang3_OBJ = gltf.scene.getObjectByName("huaqiang3");
    huaqiang3_OBJ.material = m.huaqiang3_M;
    const huaqiang2_OBJ = gltf.scene.getObjectByName("huaqiang2");
    huaqiang2_OBJ.material = m.huaqiang2_M;
    const qiang2_OBJ = gltf.scene.getObjectByName("qiang2");
    qiang2_OBJ.material = m.qiang2_M;
    const qiang3_OBJ = gltf.scene.getObjectByName("qiang3");
    qiang3_OBJ.material = m.qiang3_M;
    const qiang1_OBJ = gltf.scene.getObjectByName("qiang1");
    qiang1_OBJ.material = m.qiang1_M;
    const men2_OBJ = gltf.scene.getObjectByName("men2");
    men2_OBJ.material = m.men2_M;
    const chuanghu_OBJ = gltf.scene.getObjectByName("chuanghu");
    chuanghu_OBJ.material = m.chuanghu_M;
    const dingtiao_OBJ = gltf.scene.getObjectByName("dingtiao");
    dingtiao_OBJ.material = m.dingtiao_M;
    const dingbian_OBJ = gltf.scene.getObjectByName("dingbian");
    dingbian_OBJ.material = m.dingbian_M;
    const dizuo1_OBJ = gltf.scene.getObjectByName("dizuo1");
    dizuo1_OBJ.material = m.dizuo1_M;
    const qiang4_OBJ = gltf.scene.getObjectByName("qiang4");
    qiang4_OBJ.material = m.qiang4_M;
    const cebaiqiang_OBJ = gltf.scene.getObjectByName("cebaiqiang");
    cebaiqiang_OBJ.material = m.ding_M;
    const boli1_OBJ = gltf.scene.getObjectByName("boli1");
    boli1_OBJ.material = m.boli1_M;
    const dimian2_OBJ = gltf.scene.getObjectByName("dimian2");
    dimian2_OBJ.material = m.dimian2_M;
    const dimian3_OBJ = gltf.scene.getObjectByName("dimian3");
    dimian3_OBJ.material = m.dimian3_M;
    const deng_OBJ = gltf.scene.getObjectByName("deng");
    deng_OBJ.material = m.deng_M;
    const ding_OBJ = gltf.scene.getObjectByName("ding");
    ding_OBJ.material = m.ding_M;
    const baiding_OBJ = gltf.scene.getObjectByName("baiding");
    baiding_OBJ.material = m.baiding_M;

    // 自定义info
    const info3d = gltf.scene.getObjectByName("jianjieqiang");
    info3d.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: new THREE.TextureLoader().load("./assets/pictures2/main.jpg"),
      // depthFunc: 3,
    });
  });

  //加载机器人
  vr.loadGLTF({
    url: "./assets/robot/robot.glb",
    position: {
      x: 19.655541400079763,
      y: 0.3955837972716467,
      z: 3.3849787954383963,
    },
    // autoLight: true,
    rotation: { x: 0, y: -Math.PI / 2, z: 0 },
    scale: 0.4,
  }).then((gltf) => {
    gltf.scene.odata = { id: "robot" };
    vr.addClickEvent(gltf.scene);
    // 调用动画
    vr.createAnimate(gltf, { animateIndex: 0, duration: 5 });
  });

  // 加载球模型
  vr.loadGLTF({
    scale: 0.5,
    position: {
      x: 0.14009586306492472,
      y: 0.3955837972716467,
      z: 3.3849787954383963,
    },
    autoLight: true,
    url: `./assets/separate/sphere-bot-with-hydraulics_2_8_Baked_Animations.gltf`,
  }).then((gltf) => {
    gltf.scene.odata = { id: "ball" };
    vr.addClickEvent(gltf.scene);
    // 调用动画
    //vr.createAnimate(gltf, { animateIndex: 0, duration: 60 });
  });

  // // 加载房模型
  // vr.loadGLTF({
  //   scale: 0.4,
  //   position: {
  //     x: -9.697628171904498,
  //     y: 1.6742415555214554,
  //     z: 3.343388656678843,
  //   },
  //   rotation: {
  //     x: -3.141592653589793,
  //     y: 0.03132610956215899,
  //     z: -3.141592653589793,
  //   },
  //   url: `./assets/gltfs/feichuan.glb`,
  //   autoLight: true,
  // }).then((gltf) => {
  //   gltf.scene.odata = { id: "man" };
  //   vr.addClickEvent(gltf.scene);
  //   vr.createAnimate(gltf, { animateIndex: 0, duration: 60 });
  // });

  // 加载画框数据
  vr.loadItems(data);

  // vr.initVRButton();

  // 导览点
  let shtml = "";
  data.forEach((d) => {
    shtml += `<li class="item" data-id="${d.id}">${d.name}</li>`;
  });
  shtml += `<li class="gravity">重力感应</li>`;

  document.querySelector(".view").innerHTML = shtml;

  document.querySelector(".gravity").addEventListener("click", () => {
    if (document.location.protocol === "https:") {
      vr.gravity.toggle();
    } else {
      alert("需要开启https");
    }
  });

  document.querySelectorAll(".item").forEach((target) => {
    target.addEventListener("click", () => {
      const id = target.dataset.id;
      vr.viewItem(id);
    });
  });
};
