"use strict";

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const listSelector = document.getElementById("list-selector");
const undoBtn = document.getElementById("undo-btn");

let lastDeleted = null;
let pendingDelete = null;

addBtn.addEventListener("click", () => {
    const task = input.value.trim();
    const selectedListId = listSelector.value;
    const targetList = document.querySelector(`#list-${selectedListId} .todo-list`);
    if(task) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${task}</span>
            <span class="done-date"></span>
            <button class="remove-btn">X</button>
        `;

        const taskText = li.querySelector(".task-text");
        const taskDate = li.querySelector(".done-date");

        taskText.addEventListener("click", () => {
            li.classList.toggle("done");
            if (li.classList.contains("done")) {
                const now = new Date();
                taskDate.textContent = now.toLocaleString();
            } else {
                taskDate.textContent = "";
            }
        });

        li.querySelector(".remove-btn").addEventListener("click", () => {
            pendingDelete = li;
            document.getElementById("modal-text").textContent = 
                `Czy na pewno chcesz usunąć zadanie o treści: "${li.querySelector(".task-text").textContent}"?`;
            document.getElementById("confirm-modal").style.display = "flex";
        });
        targetList.appendChild(li);
        input.value = "";
        input.focus();
    }
});

undoBtn.addEventListener("click", () => {
    if (lastDeleted && lastDeleted.parent && lastDeleted.element) {
        lastDeleted.parent.appendChild(lastDeleted.element);
        lastDeleted = null;
        undoBtn.disabled = true;
    }
});

document.getElementById("confirm-delete").addEventListener("click", () => {
    if (pendingDelete) {
        lastDeleted = {
            element: pendingDelete,
            parent: pendingDelete.parentElement
        };
        pendingDelete.remove();
        undoBtn.disabled = false;
        pendingDelete = null;
    }
    document.getElementById("confirm-modal").style.display = "none";
});

document.getElementById("cancel-delete").addEventListener("click", () => {
    pendingDelete = null;
    document.getElementById("confirm-modal").style.display = "none";
});

document.querySelectorAll(".list-header").forEach(header => {
    header.addEventListener("click", () => {
        const ul = header.nextElementSibling;
        ul.style.display = ul.style.display === "none" ? "block" : "none";
    });
});
