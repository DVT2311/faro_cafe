document.addEventListener("DOMContentLoaded", function () {
    const headerContainer = document.getElementById('header-placeholder'); 
    const footerContainer = document.getElementById('footer-placeholder');

    const promises = [];

    // 1. Tạo Promise tải Header
    if (headerContainer) {
        const headerPromise = fetch('components/header.html')
            .then(response => response.text())
            .then(data => {
                headerContainer.outerHTML = data;
            })
            .catch(err => console.error("Lỗi tải Header:", err));
        promises.push(headerPromise);
    }

    // 2. Tạo Promise tải Footer
    if (footerContainer) {
        const footerPromise = fetch('components/footer.html') 
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(err => console.error("Lỗi tải Footer:", err));
        promises.push(footerPromise);
    }

    // 3. Đợi cả hai tải xong hoàn toàn mới hiển thị giao diện và xử lý logic
    Promise.all(promises).then(() => {
        document.body.classList.add('layout-loaded');
        
        // ============================================================
        // LOGIC TỰ ĐỘNG ACTIVE MENU KHI ĐỔI PAGE
        // ============================================================
        const currentUrl = window.location.href.split('#')[0].split('?')[0];
        const menuLinks = document.querySelectorAll('.navbar-nav .nav-link');

        menuLinks.forEach(link => {
            const hrefValue = link.getAttribute('href'); 
            if (!hrefValue || hrefValue === '#') return;

            const absoluteLinkUrl = link.href.split('#')[0].split('?')[0];

            if (currentUrl === absoluteLinkUrl || (hrefValue === 'index.html' && currentUrl.endsWith('/'))) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
                
                const dropdownParent = link.closest('.dropdown');
                if (dropdownParent) {
                    const dropdownToggle = dropdownParent.querySelector('.dropdown-toggle');
                    if (dropdownToggle) dropdownToggle.classList.add('active');
                }
            } else {
                link.classList.remove('active');
            }
        });

        // ============================================================
        // KHỞI TẠO SWIPER (ĐẢM BẢO HTML ĐÃ LOAD XONG 100%)
        // ============================================================
        
        // Khởi tạo Swiper Slide cho phần Giới thiệu (About) nếu tồn tại trên trang
        if (document.querySelector('.aboutSwiper')) {
            new Swiper('.aboutSwiper', {
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                    el: '.aboutSwiper .swiper-pagination', 
                    clickable: true,
                },
            });
        }

        // Khởi tạo Swiper Slide cho phần Đánh giá (Testimonials) nếu tồn tại trên trang
        if (document.querySelector('.tesSwiper')) {
            new Swiper('.tesSwiper', {
                slidesPerView: 1,
                spaceBetween: 22,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.tesSwiper .swiper-pagination', 
                    clickable: true
                },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }
            });
        }
        // ============================================================
    });
});