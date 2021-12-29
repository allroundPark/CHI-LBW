let email;
let productID; //  Will start from 0 and will end with 1
let reviewID;  //  From 0 to 20(?) 
let result;     // JSON that will contain the entire study data
let productImages = {
    "hand cream": [
        "hand cream-1.png",
        "hand cream-2.png",
    ],
    "headphone": [
        "headphone-1.png", "headphone-2.png",
        "headphone-3.png", "headphone-4.png",
        "headphone-5.png", "headphone-6.png"
    ]
};
const range = (start, end, step = 1) => {
    let output = [];
    if (typeof end === 'undefined') {
        end = start;
        start = 0;
    }
    for (let i = start; i < end; i += step) {
        output.push(i);
    }
    return output;
};
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

window.onbeforeunload = function(){
    return '지금 페이지를 이동하면 입력 중인 데이터를 잃으실 수 있습니다.';
};
  
window.addEventListener("load", ()=>{
    // This method will run after loading all the resources
    if (typeof localStorage["lbw"] == "undefined") localStorage["lbw"] = {};
    productID = 0;
    reviewID = 0;
    result = {};
    goPageCode("intro");
});


function generateStudy(productOrder) {
    // productOrder can be either ["hand cream", "headphone"] or flipped
    let studyEl = document.querySelector(".page[pageCode='study']");
    productOrder.forEach((pcode,pi)=>{
        let imageHTML = productImages[pcode].map(fn=>{return "<img src='images/"+fn+"'/>";});
        // Generating reviews 
        let reviewHTML = "";
        let randomIndices = shuffle(range(1, 20));
        console.log(randomIndices);
        result[pcode] = {
            "reviewIndices":randomIndices,
            "answers":{

            }
        };
        randomIndices.forEach(i=>{
            let reviewData = data.review.find((item)=>{
                return item.product==pcode && item["review-number"] == i.toString();
            });
            // console.log(i);
            // console.log(reviewData);
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
            reviewHTML += el_html;
        });
        // END OF generating reviews
        let html = `
            <div class="product ${(pi==1)?"hidden":""}" pcode="${pcode}">
                <h3>Product ${(pi==0)?"A":"B"}</h3>
                <div class="productInstruction">
                    ${imageHTML}
                    <div class='controls'>
                        <button class='btn btn-info' onclick='showQuestion(1)'>Next</button>
                    </div>
                </div>
                ${reviewHTML}
            </div>
        `;
        studyEl.innerHTML += html;
    });



}

function restoreFromLocalStorage(stringData){
    // result = 
}

function goPageCode(pageCode){
    if (pageCode=="tutorial") {
        // save the email id
        email = document.querySelector("#email").value;
        if(typeof localStorage["lbw"][email] != "undefined"){
            restoreFromLocalStorage(localStorage["lbw"][email]);
        }
    }
    // open page pageNum
    document.querySelectorAll(".page").forEach(el=>{
        el.classList.add("hidden");  
    });
    document.querySelectorAll(".page[pageCode='"+pageCode+"']").forEach(el=>{
        el.classList.remove("hidden");
    });
    if (pageCode=="study") {
        generateStudy(["hand cream", "headphone"]);
    }
}





