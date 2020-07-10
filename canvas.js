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
  let img = "";
  const img1 = await loadImage("T-Shirt.jpg");
  const img2 = await loadImage("curtain.jpg");
  const img3 = await loadImage("water.jpg");
  const img4 = await loadImage("hammer.jpg");
  const widthShirt = 190;
  const widthCurtain = 220;
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
        //T-Shirt
        canvas1.height = 500;
        canvas1.width = getWidth(img1, 500);
        ctx1.globalCompositeOperation = "multiply";
        ctx1.drawImage(img1, 0, 0, getWidth(img1, 500), 500);
        ctx1.translate(
          (canvas1.width - widthShirt) / 2 - 2,
          (canvas1.height - getHeight(img, widthShirt)) / 2 + 30
        );
        ctx1.drawImage(img, 0, 0, widthShirt, getHeight(img, widthShirt));
        //Curtain
        canvas2.height = 500;
        canvas2.width = getWidth(img2, 500);
        ctx2.globalCompositeOperation = "multiply";
        ctx2.drawImage(img2, 0, 0, getWidth(img2, 500), 500);
        ctx2.translate(
          canvas2.width - widthCurtain - 20,
          (canvas2.height - getHeight(img, widthCurtain)) / 2
        );
        ctx2.drawImage(img, 0, 0, widthCurtain, getHeight(img, widthCurtain));
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
        ctx4.transform(1, 0.13, 0.2, 0.8, 335, 180);
        ctx4.rotate((-15 * Math.PI) / 180);
        ctx4.drawImage(img, 0, 0, getWidth(img, 250), 180);
        dropZoneElement.style.display = "none";
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }
};
