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
        let randomIndices = shuffle(range(1, 21));
        console.log(randomIndices);
        result[pcode] = {
            "reviewIndices":randomIndices,
            "answers":{

            }
        };
        randomIndices.forEach((reviewNum,ri,ril)=>{
            let reviewData = data.review.find((item)=>{
                return item.product==pcode && item["review-number"] == reviewNum.toString();
            });
            // console.log(i);
            // console.log(reviewData);
            let rating_html = "";
            for (star_idx =0; star_idx<reviewData["rate"];star_idx++) {
                rating_html += `<img class='star' src="images/star.png"/>`;
            }
            let prevReviewNum;
            if(ri==0) prevReviewNum = -1;
            else prevReviewNum = ril[ri-1];
            let nextReviewNum;
            if(ri>ril.length-2) {
                if (pi==0) nextReviewNum = '"Next Product"';
                else nextReviewNum = '"Next Page"';
            } else nextReviewNum = ril[ri+1];

            let el_html = `<div class='review hidden' reviewNum='${reviewNum}'>
                <div class="review-title">${reviewData["review-title"]}</div>
                <div class="review-rate">
                    ${rating_html}
                </div>
                <div class="review-body">${reviewData["review-body"]}</div>
                <div class="review-body-translated">${reviewData["review-body-translated"]}</div>
                <div class="likert">
                    리뷰가 구매 결정에 얼마나 도움이 되었다고 생각하시나요? 
                    <table>
                        <tr>
                            <td>1</td> <td>2</td> <td>3</td> <td>4</td>
                            <td>5</td> <td>6</td> <td>7</td> <td>8</td>
                            <td>9</td> 
                        </tr>
                        <tr>
                            <td><input type='radio' name='sample_1' value='1'/></td>
                            <td><input type='radio' name='sample_1' value='2'/></td>
                            <td><input type='radio' name='sample_1' value='3'/></td>
                            <td><input type='radio' name='sample_1' value='4'/></td>
                            <td><input type='radio' name='sample_1' value='5'/></td>
                            <td><input type='radio' name='sample_1' value='6'/></td>
                            <td><input type='radio' name='sample_1' value='7'/></td>
                            <td><input type='radio' name='sample_1' value='8'/></td>
                            <td><input type='radio' name='sample_1' value='9'/></td>
                        </tr>
                    </table>

                </div>
                <div class='control'>
                    <button class='btn btn-info' onclick='showReview("${pcode}", ${prevReviewNum})'>Prev</button>
                    <button class='btn btn-info' onclick='showReview("${pcode}", ${nextReviewNum})'>Next</button>
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
                        <button class='btn btn-info' onclick='showReview("${pcode}", ${randomIndices[0]})'>Next</button>
                    </div>
                </div>
                ${reviewHTML}
            </div>
        `;
        studyEl.innerHTML += html;
    });



}

function showReview(productCode, reviewIndex) {
    // document.querySelectorAll(".product").forEach(el=>{el.classList.add("hidden");});
    // document.querySelector(".product[pcode='"+productCode+"']").classList.remove("hidden");

    let product_el = document.querySelector(".product[pcode='"+productCode+"']");
    product_el.querySelector(".productInstruction").classList.add("hidden");
    product_el.querySelectorAll(".review").forEach(el=>{el.classList.add("hidden")});
    try {
        if (reviewIndex==0) {
            product_el.querySelector(".productInstruction").classList.remove("hidden");
        } else {
            product_el.querySelector(".review[reviewnum='"+reviewIndex+"']").classList.remove("hidden");
        }
        
    } catch(e){
        console.log(e);
    }
    
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





