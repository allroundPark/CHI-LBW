let productID; //  Will start from 0 and will end with 1
let reviewID;  //  From 0 to 20(?) 
let result;     // JSON that will contain the entire study data
let productImages = ["file1.jpg","file2.jpg"];

window.onbeforeunload = function(){
    return '지금 페이지를 이동하면 입력 중인 데이터를 잃으실 수 있습니다.';
};
  
window.addEventListener("load", ()=>{
    // This method will run after loading all the resources
    productID = 0;
    reviewID = 0;
    result = {};

    goPageCode("intro");
});


function startProductSection(productNum) {
    // productNum is either 1 or 2
    let pageEl = document.querySelector(".page[pageCode='study']");
    let productImageEl = pageEl.querySelector(".productImage");
    // productImageEl.src = productImages[productNum];


    let reviewContainer = document.querySelector(".reviewContainer");
    // Generating reviews 
    if (productNum==0) {
        for (let i=1; i<=20; i++) {
            let reviewData = data.review.find((item)=>{
                return item.product=="hand cream" && item["review-number"] == i.toString();
            });
            let el_html = `<div class='review'>
                <div class="review-title">${reviewData["review-title"]}</div>
                <div class="review-body">${reviewData["review-body"]}</div>
                <div class="review-body-translated">${reviewData["review-body-translated"]}</div>
                <div class="helpfullness-rating">${reviewData["helpfullness-rating"]}</div>
            </div>`;
            reviewContainer.innerHTML += el_html;
        }
    } else {

    }
}

function goPageCode(pageCode){
    // open page pageNum
    document.querySelectorAll(".page").forEach(el=>{
        el.classList.add("hidden");  
    });
    document.querySelectorAll(".page[pageCode='"+pageCode+"']").forEach(el=>{
        el.classList.remove("hidden");
    });
}





