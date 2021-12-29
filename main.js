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


function startProductSection(productCode) {
    let pageEl = document.querySelector(".page[pageCode='study']");
    let productInstructionEl = pageEl.querySelector(".product_instruction");
    if (productCode == "hand cream"){
        productInstructionEl.innerHTML = `
            <h3>Product A.</h3>
            <img src='images/hand cream-1.png'/><br/>
            <img src='images/hand cream-2.png'/><br/>
            <button class='btn btn-info'>Next<button>
        `; 
    } else {
        productInstructionEl.innerHTML = `
            <h3>Product B.</h3>
            <img src='images/headphone-1.png'/><br/>
            <img src='images/headphone-2.png'/><br/>
            <img src='images/headphone-3.png'/><br/>
            <img src='images/headphone-4.png'/><br/>
            <img src='images/headphone-5.png'/><br/>
            <img src='images/headphone-6.png'/><br/>
            <button class='btn btn-info'>Next<button>
        `; 
    }
    
    // productImageEl.src = productImages[productNum];


    let reviewContainer = document.querySelector(".reviewContainer");
    // Generating reviews 
    for (let i=1; i<=20; i++) {
        let reviewData = data.review.find((item)=>{
            return item.product==productCode && item["review-number"] == i.toString();
        });
        let el_html = `<div class='review hidden' reviewNum='${i}'>
            <div class="review-title">${reviewData["review-title"]}</div>
            <div class="review-body">${reviewData["review-body"]}</div>
            <div class="review-body-translated">${reviewData["review-body-translated"]}</div>
            <div class="helpfullness-rating">${reviewData["helpfullness-rating"]}</div>
            <div class='control'>
                <button class='btn btn-info' onclick='showReview(${i-1})'>Prev</div>
                <button class='btn btn-info' onclick=''>Next(${i+1})</div>
            </div>
        </div>`;
        reviewContainer.innerHTML += el_html;
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





