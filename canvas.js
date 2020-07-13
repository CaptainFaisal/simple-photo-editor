window.onload = async () => {
  const canvas1 = document.getElementById("canvas1");
  const canvas2 = document.getElementById("canvas2");
  const canvas3 = document.getElementById("canvas3");
  const canvas4 = document.getElementById("canvas4");
  const ctx1 = canvas1.getContext("2d");
  const ctx2 = canvas2.getContext("2d");
  const ctx3 = canvas3.getContext("2d");
  const ctx4 = canvas4.getContext("2d");
  [canvas1, canvas2, canvas3, canvas4].forEach(
    (canvas) => (canvas.style.display = "none")
  );
  const loadImage = (url) => {
    return new Promise((r) => {
      let i = new Image();
      i.onload = () => r(i);
      i.src = url;
    });
  };
  let img = "";
  const img1 = await loadImage("T-Shirt.jpg");
  const img2 = await loadImage("curtain.jpg");
  const img3 = await loadImage("water.jpg");
  const img4 = await loadImage("hammer.jpg");
  const widthShirt = 240;
  const heightShirt = 410;
  const widthWater = 250;
  const heightCurtain = 380;
  const widthCurtain = 190;
  const heightHammer = 180;
  const widthHammer = 110;
  const heightBgTShirt = img1.height;
  const heightBgCurtain = img2.height;
  const heightBgWater = img3.height;
  const heightBgHammer = img4.height;
  const getWidth = (img, height) => {
    return height * (img.width / img.height);
  };
  const getHeight = (img, width) => {
    return width * (img.height / img.width);
  };
  document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });

    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();

      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }

      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = async () => {
        img = await loadImage(reader.result);
        [canvas1, canvas2, canvas3, canvas4].forEach(
          (canvas) => (canvas.style.display = "block")
        );
        //T-Shirt
        canvas1.height = heightBgTShirt;
        canvas1.width = getWidth(img1, heightBgTShirt);
        ctx1.globalCompositeOperation = "multiply";
        ctx1.drawImage(
          img1,
          0,
          0,
          getWidth(img1, heightBgTShirt),
          heightBgTShirt
        );
        if (img.height > heightShirt && img.width > widthShirt) {
          if (getHeight(img, widthShirt) > heightShirt) {
            ctx1.translate(
              (canvas1.width - widthShirt) / 2 - 2,
              canvas1.height - heightShirt - 80
            );
            ctx1.drawImage(img, 0, 0, widthShirt, heightShirt);
          } else {
            ctx1.translate(
              (canvas1.width - widthShirt) / 2 - 2,
              canvas1.height - getHeight(img, widthShirt) - 80
            );
            ctx1.drawImage(img, 0, 0, widthShirt, getHeight(img, widthShirt));
          }
        } else if (img.height > heightShirt) {
          ctx1.translate(
            (canvas1.width - img.width) / 2 - 2,
            canvas1.height - heightShirt - 80
          );
          ctx1.drawImage(img, 0, 0, img.width, heightShirt);
        } else if (img.width > widthShirt) {
          ctx1.translate(
            (canvas1.width - widthShirt) / 2 - 2,
            (canvas1.height - img.height) / 2
          );
          ctx1.drawImage(img, 0, 0, widthShirt, img.height);
        } else {
          ctx1.translate(
            (canvas1.width - img.width) / 2 - 2,
            (canvas1.height - img.height) / 2
          );
          ctx1.drawImage(img, 0, 0, img.width, img.height);
        }
        //Curtain
        canvas2.height = heightBgCurtain;
        canvas2.width = getWidth(img2, heightBgCurtain);
        ctx2.globalCompositeOperation = "multiply";
        ctx2.drawImage(
          img2,
          0,
          0,
          getWidth(img2, heightBgCurtain),
          heightBgCurtain
        );
        if (img.height > heightCurtain && img.width > widthCurtain) {
          if (getHeight(img, widthCurtain) > heightCurtain) {
            ctx2.translate(
              canvas2.width - widthCurtain,
              (canvas2.height - heightCurtain) / 2
            );
            ctx2.drawImage(img, 0, 0, widthCurtain, heightCurtain);
            console.log("1");
          } else {
            ctx2.translate(
              canvas2.width - widthCurtain,
              (canvas2.height - getHeight(img, widthCurtain)) / 2
            );
            ctx2.drawImage(
              img,
              0,
              0,
              widthCurtain,
              getHeight(img, widthCurtain)
            );
            console.log("2");
          }
        } else if (img.height > heightCurtain) {
          ctx2.translate(
            canvas2.width - img.width - 80,
            (canvas2.height - heightCurtain) / 2
          );
          ctx2.drawImage(img, 0, 0, img.width, heightCurtain);
        } else if (img.width > widthCurtain) {
          ctx2.translate(
            canvas2.width - widthCurtain,
            (canvas2.height - img.height) / 2
          );
          ctx2.drawImage(img, 0, 0, widthCurtain, img.height);
        } else {
          ctx2.translate(
            canvas2.width - img.width - 10,
            canvas2.height - img.height - 80
          );
          ctx2.drawImage(img, 0, 0, img.width, img.height);
        }
        //Water
        canvas3.height = heightBgWater;
        canvas3.width = getWidth(img3, heightBgWater);
        ctx3.globalCompositeOperation = "multiply";
        ctx3.drawImage(
          img3,
          0,
          0,
          getWidth(img3, heightBgWater),
          heightBgWater
        );
        ctx3.translate(200, 150);
        ctx3.rotate((-30 * Math.PI) / 180);
        ctx3.drawImage(img, 0, 0, widthWater, getHeight(img, widthWater));
        //hammer
        canvas4.height = heightBgHammer;
        canvas4.width = getWidth(img4, heightBgHammer);
        ctx4.globalCompositeOperation = "multiply";
        ctx4.drawImage(
          img4,
          0,
          0,
          getWidth(img4, heightBgHammer),
          heightBgHammer
        );
        ctx4.rotate((-15 * Math.PI) / 180);
        if (img.height > heightHammer && img.width > widthHammer) {
          ctx4.transform(
            1,
            0.13,
            0.2,
            0.8,
            img4.width - widthHammer - 165,
            heightBgHammer - heightHammer + 75
          );
          if (getHeight(img, widthHammer) > heightHammer) {
            ctx4.drawImage(img, 0, 0, widthHammer, heightHammer);
          }
          ctx4.drawImage(img, 0, 0, widthHammer, getHeight(img, widthHammer));
        } else if (img.height > heightHammer) {
          ctx4.transform(
            1,
            0.13,
            0.2,
            0.8,
            img4.width / 2.3,
            img4.height / 1.5 - 5
          );
          ctx4.drawImage(img, 0, 0, img.width, heightHammer);
        } else if (img.width > widthHammer) {
          ctx4.transform(
            1,
            0.13,
            0.2,
            0.8,
            img4.width / 2.4,
            img4.height / 1.5
          );
          ctx4.drawImage(img, 0, 0, widthHammer, img.height);
        } else {
          ctx4.transform(1, 0.13, 0.2, 0.8, 200, 200);
          ctx4.drawImage(img, 0, 0, img.width, img.height);
        }
        dropZoneElement.style.display = "none";
        [canvas1, canvas2, canvas3, canvas4].forEach((canvas) =>
          canvas.addEventListener("click", () => {
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href = canvas.toDataURL();
            a.download = `${canvas.getAttribute("data-title")}.png`;
            a.click();
            document.body.removeChild(a);
          })
        );
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }
};
