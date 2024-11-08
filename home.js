async function fetchWikipediaTerm(term) {
    // 입력된 용어를 소문자로 변환
    const normalizedTerm = term.toUpperCase();

    const url = `https://ko.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&titles=${normalizedTerm}&origin=*`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Wikipedia API 요청 실패");
        }

        const data = await response.json();
        const pages = data.query.pages;
        const page = pages[Object.keys(pages)[0]];

        // 설명 텍스트가 없을 경우 메시지 반환
        const description = page.extract || "해당 용어에 대한 설명을 찾을 수 없습니다.";
        return description;
        
    } catch (error) {
        console.error("오류:", error);
        return "API 요청 중 오류가 발생했습니다.";
    }
}

function displayTermDescription(term, description) {
    document.getElementById("term-title").innerText = term;
    document.getElementById("term-description").innerText = description;
}

// 검색 버튼 클릭 이벤트 처리
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");

    searchButton.addEventListener("click", async () => {
        const term = searchInput.value.trim();
        if (term) {
            const description = await fetchWikipediaTerm(term);
            displayTermDescription(term, description);
        } else {
            alert("검색할 용어를 입력하세요.");
        }
    });
});
