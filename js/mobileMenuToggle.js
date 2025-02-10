const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");
const mobileMenu = document.getElementById("mobileMenu");

// 메뉴를 닫는 함수
function closeMenu() {
    mobileMenu.innerHTML = "";
}

// 모바일 메뉴 열기/닫기 처리
menuButton.addEventListener("click", () => {
    // 메뉴가 열려 있으면 닫기, 열려 있지 않으면 열기
    if (mobileMenu.innerHTML === "") {
        // 메뉴 항목 복사
        mobileMenu.innerHTML = menu.innerHTML;

        // 메뉴 항목 스타일 적용
        const menuItems = mobileMenu.querySelectorAll("a");
        menuItems.forEach((item, index) => {
            item.classList.add(...mobileMenuStyle.split(" "));  // 스타일 적용
            if (index === 0) {
                item.classList.add("mt-1.5");
            }
            // 애니메이션 추가
            item.style.animation = `slideDown forwards ${index * 0.2}s`;
        });
    } else {
        closeMenu();
    }
});

// 메뉴 항목 클릭 시 처리
mobileMenu.addEventListener("click", (event) => {
    // 클릭된 요소가 메뉴 항목인지 확인
    if (event.target && event.target.tagName === "A") {
        event.preventDefault();  // 기본 링크 동작 방지

        const itemText = event.target.innerText + ".md";  // 클릭된 메뉴 항목 텍스트

        // 해당 페이지로 이동
        if (itemText === "blog.md") {
            // 블로그 페이지로 이동
            if (blogList.length === 0) {
                initDataBlogList().then(() => {
                    renderBlogList();
                });
            } else {
                renderBlogList();
            }

            // URL을 main 페이지로 변경
            const url = new URL(window.location.href);
            url.pathname = "/";  // main 페이지로 리디렉션
            url.searchParams.set("menu", itemText);
            window.history.pushState({}, "", url);  // URL 업데이트
        } else {
            // 블로그 외의 페이지 처리 (about.md, contact.md)
            renderOtherContents(itemText);
            
            // URL 업데이트
            const url = new URL(window.location.href);
            url.pathname = `/${itemText}`;  // 각 항목에 맞는 페이지로 업데이트
            window.history.pushState({}, "", url);
        }

        // 메뉴 닫기
        closeMenu();
    }
});

// 메뉴 외부 클릭 시 메뉴 닫기
window.addEventListener("click", (event) => {
    // 메뉴 외부를 클릭했을 경우 메뉴 닫기
    if (!mobileMenu.contains(event.target) && event.target !== menuButton) {
        closeMenu();
    }
});
