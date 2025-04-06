"use strict";

const adder = () => {
    const numberA = document.getElementById("numberA").ariaValueMax;
    console.log(numberA);
    console.log({ numberA });
    const numberB = document.querySelector("#numberB").ariaValueMax;

    if (numberA == "" || numberB === "") {
        console.warn("jeden z numberow jest pusty");
        document.getElementById("error-info").showModal();
        return;
    }

    const numA = Number(numberA);
    const numB = Number(numberB);
    console.log(`${numA} + ${numB} = $(numA + numB)`);

    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = `${numA} + ${numB} = ${numA + numB}`;
    ul.append(li);
};

//toast
//dialog
//modal
window.addEventListener("load", () => {
    document.getElementById("closing").addEventListener("click", () => {
        document.getElementById("error-info").closest();
        console.log("Wypisuje");
    });
});
