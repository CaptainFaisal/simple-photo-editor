window.onload = async () => {
  const canvas1 = document.getElementById("canvas1");
  const canvas2 = document.getElementById("canvas2");
  const canvas3 = document.getElementById("canvas3");
  const canvas4 = document.getElementById("canvas4");
  const ctx1 = canvas1.getContext("2d");
  const ctx2 = canvas2.getContext("2d");
  const ctx3 = canvas3.getContext("2d");
  const ctx4 = canvas4.getContext("2d");
  const loadImage = (url) => {
    return new Promise((r) => {
      let i = new Image();
      i.onload = () => r(i);
      i.src = url;
    });
  };
  const img = await loadImage("facebook.PNG");
  const img1 = await loadImage("T-Shirt.jpg");
  const img2 = await loadImage("curtain.jpg");
  const img3 = await loadImage("water.jpg");
  const img4 = await loadImage("hammer.jpg");
  const getWidth = (img, height) => {
    return height * (img.width / img.height);
  };
  //T-Shirt
  canvas1.height = 500;
  canvas1.width = getWidth(img1, 500);
  ctx1.globalCompositeOperation = "multiply";
  ctx1.drawImage(img1, 0, 0, getWidth(img1, 500), 500);
  ctx1.translate(90, 120);
  ctx1.drawImage(img, 0, 0, getWidth(img, 320), 320);
  //Curtain
  canvas2.height = 500;
  canvas2.width = getWidth(img2, 500);
  ctx2.globalCompositeOperation = "multiply";
  ctx2.drawImage(img2, 0, 0, getWidth(img2, 400), 400);
  ctx2.drawImage(img, canvas2.width / 2 + 30, 30, getWidth(img, 320), 320);
  //Water
  canvas3.height = 500;
  canvas3.width = getWidth(img3, 500);
  ctx3.globalCompositeOperation = "multiply";
  ctx3.drawImage(img3, 0, 0, getWidth(img3, 400), 400);
  ctx3.translate(100, 100);
  ctx3.rotate((-30 * Math.PI) / 180);
  ctx3.drawImage(img, 0, 0, getWidth(img, 320), 320);
  //hammer
  canvas4.height = 500;
  canvas4.width = getWidth(img4, 500);
  ctx4.globalCompositeOperation = "multiply";
  ctx4.drawImage(img4, 0, 0, getWidth(img4, 400), 400);
  ctx4.transform(1, 0.13, 0.2, 1, 335, 180);
  ctx4.rotate((-15 * Math.PI) / 180);
  ctx4.drawImage(img, 0, 0, getWidth(img, 250), 180);
};
