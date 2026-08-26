/* =========================================================
   BOOK
========================================================= */

const bookElement =
  document.getElementById("book");


/* =========================================================
   PAGE NUMBER
========================================================= */

const pageText =
  document.getElementById("pageNum");


const pages =
  document.querySelectorAll(".page");


const totalPages =
  pages.length;


/* =========================================================
   DEVICE MODE
========================================================= */

/*
   Desktop / Laptop
   = หน้าคู่

   Tablet / iPad / Mobile
   = หน้าเดี่ยว
*/

function getPortraitMode() {

  return window.innerWidth <= 768;

}


/* =========================================================
   CREATE PAGE FLIP
========================================================= */

const pageFlip =
  new St.PageFlip(

    bookElement,

    {

      /* ==============================================
         ขนาดจริงของ 1 หน้า
      ============================================== */

      width: 2480,

      height: 3508,


      /* ==============================================
         ขนาดต่ำสุด
      ============================================== */

      minWidth: 280,

      minHeight: 396,


      /* ==============================================
         ขนาดสูงสุดของ 1 หน้า

         2480 : 3508
         ≈
         675 : 955
      ============================================== */

      maxWidth: 675,

      maxHeight: 955,


      /* ==============================================
         Responsive
      ============================================== */

      size: "stretch",


      /* ==============================================
         ปก
      ============================================== */

      showCover: true,


      /* ==============================================
         เงากระดาษ
      ============================================== */

      maxShadowOpacity: 0.45,

      drawShadow: true,


      /* ==============================================
         ความเร็วพลิก
      ============================================== */

      flippingTime: 900,


      /* ==============================================
         Mouse / Touch
      ============================================== */

      useMouseEvents: true,

      mobileScrollSupport: false,

      swipeDistance: 15,


      /* ==============================================
         เริ่มที่ปก
      ============================================== */

      startPage: 0,


      /* ==============================================
         มุมหน้า
      ============================================== */

      showPageCorners: true,


      /* ==============================================
         คลิกหน้าเพื่อเปิด
      ============================================== */

      disableFlipByClick: false,


      /* ==============================================
         Portrait
      ============================================== */

      usePortrait:
        getPortraitMode(),


      /* ==============================================
         Auto size
      ============================================== */

      autoSize: true

    }

  );


/* =========================================================
   LOAD PAGES
========================================================= */

pageFlip.loadFromHTML(
  pages
);


/* =========================================================
   INITIAL PAGE
========================================================= */

pageText.textContent =
  "1 / " + totalPages;


/* =========================================================
   FLIP EVENT
========================================================= */

pageFlip.on(
  "flip",
  function (e) {

    const currentPage =
      e.data + 1;


    pageText.textContent =
      currentPage +
      " / " +
      totalPages;

  }
);


/* =========================================================
   FLIP STATE
========================================================= */

pageFlip.on(
  "changeState",
  function (e) {

    const state =
      e.data;


    if (state === "flipping") {

      bookElement.classList.add(
        "book-flipping"
      );

    }

    else {

      bookElement.classList.remove(
        "book-flipping"
      );

    }

  }
);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
  "keydown",
  function (e) {

    /*
       ลูกศรขวา
    */

    if (
      e.key === "ArrowRight" ||
      e.key === " "
    ) {

      e.preventDefault();

      pageFlip.flipNext();

    }


    /*
       ลูกศรซ้าย
    */

    if (
      e.key === "ArrowLeft"
    ) {

      e.preventDefault();

      pageFlip.flipPrev();

    }


    /*
       Home
       กลับปกหน้า
    */

    if (
      e.key === "Home"
    ) {

      pageFlip.turnToPage(0);

    }


    /*
       End
       ไปปกหลัง
    */

    if (
      e.key === "End"
    ) {

      pageFlip.turnToPage(
        totalPages - 1
      );

    }

  }
);


/* =========================================================
   RESIZE
========================================================= */

let resizeTimer;


window.addEventListener(
  "resize",
  function () {

    clearTimeout(
      resizeTimer
    );


    resizeTimer =
      setTimeout(
        function () {

          pageFlip.update();

        },
        150
      );

  }
);


/* =========================================================
   PREVENT IMAGE DRAG
========================================================= */

document.addEventListener(
  "dragstart",
  function (e) {

    if (
      e.target.tagName === "IMG"
    ) {

      e.preventDefault();

    }

  }
);