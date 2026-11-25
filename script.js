
const notices = [
    {
        id: 1,
        number: "CIR/2026/101",
        title: "End Semester Examination Form Submission",
        category: "Exams",
        date: "19 December 2026",
        urgent: true,
        description: "All students are informed that the end semester examination form submission process is now open. Students must complete their forms before the deadline. Contact the examination department for assistance.",
        documents: ["Examination Form Guidelines.pdf", "Exam Schedule.pdf"]
    },
    {
        id: 2,
        number: "CIR/2026/102",
        title: "Annual Technical Fest Registration",
        category: "Events",
        date: "18 December 2026",
        urgent: false,
        description: "The college is organizing its annual technical fest. Students from all departments are invited to participate in coding competitions, robotics, quizzes and project exhibitions.",
        documents: ["Technical Fest Information.pdf"]
    },
    {
        id: 3,
        number: "CIR/2026/103",
        title: "Last Date for Semester Fee Payment",
        category: "Fees",
        date: "17 December 2026",
        urgent: true,
        description: "All students are advised to pay their semester fees before the prescribed deadline. Students should download their payment receipts after successful payment.",
        documents: ["Semester Fee Notice.pdf", "Fee Structure.pdf"]
    },
    {
        id: 4,
        number: "CIR/2026/104",
        title: "Department Project Submission Guidelines",
        category: "Department",
        date: "16 December 2026",
        urgent: false,
        description: "All students must submit their semester projects to their respective faculty mentors. Projects should include a report, source code and presentation.",
        documents: ["Project Guidelines.pdf"]
    },
    {
        id: 5,
        number: "CIR/2026/105",
        title: "Campus Placement Drive Registration",
        category: "Placement",
        date: "15 November 2026",
        urgent: false,
        description: "Eligible final-year students are invited to register for the upcoming campus placement drive. Interested candidates must submit their updated resumes.",
        documents: ["Placement Eligibility.pdf", "Resume Format.pdf"]
    },
    {
        id: 6,
        number: "CIR/2026/106",
        title: "Workshop on Artificial Intelligence",
        category: "Events",
        date: "14 November 2026",
        urgent: false,
        description: "The Computer Science Department is organizing a workshop on Artificial Intelligence and Machine Learning. Interested students are encouraged to attend.",
        documents: ["Workshop Programme.pdf"]
    },
    {
        id: 7,
        number: "CIR/2026/107",
        title: "Updated Class Timetable",
        category: "Department",
        date: "12 November 2026",
        urgent: false,
        description: "The revised class timetable for the upcoming academic schedule has been published. Students should check their respective department schedules.",
        documents: ["Revised Timetable.pdf"]
    },
    {
        id: 8,
        number: "CIR/2026/108",
        title: "Mid Semester Examination Schedule",
        category: "Exams",
        date: "10 November 2026",
        urgent: false,
        description: "The mid semester examination timetable has been released. Students should carefully review examination dates, timings and room allocations.",
        documents: ["Mid Semester Timetable.pdf"]
    }
];

function displayNotices(data) {

    const container = document.getElementById("noticeContainer");
    const noResults = document.getElementById("noResults");

    container.innerHTML = "";

    if (data.length === 0) {
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";

    data.forEach(notice => {

        const card = document.createElement("div");
        card.className = "notice-card";

        card.innerHTML = `
            <span class="category-tag">
                ${notice.category}
            </span>

            ${notice.urgent ?
                '<span class="urgent-tag" style="display:inline-block">🔴 URGENT</span>'
                : ''
            }

            <h3>${notice.title}</h3>

            <p>📄 Circular No: ${notice.number}</p>

            <p>📅 Date: ${notice.date}</p>

            <button class="view-btn"
                onclick="showNotice(${notice.id})">
                View Details →
            </button>
        `;

        container.appendChild(card);
    });
}


function filterNotices(category, button) {

    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    if (category === "All") {
        displayNotices(notices);
    } else {
        const filtered = notices.filter(notice =>
            notice.category === category
        );

        displayNotices(filtered);
    }

    document.getElementById("searchInput").value = "";
}

function searchNotices() {

    const searchValue = document
        .getElementById("searchInput")
        .value.toLowerCase()
        .trim();

    const activeButton = document.querySelector(".filter-btn.active");
    const category = activeButton.textContent.trim();

    const filtered = notices.filter(notice => {

        const matchesCategory =
            category === "All" ||
            notice.category === category;

        const matchesSearch =
            notice.title.toLowerCase().includes(searchValue) ||
            notice.number.toLowerCase().includes(searchValue) ||
            notice.category.toLowerCase().includes(searchValue) ||
            notice.description.toLowerCase().includes(searchValue);

        return matchesCategory && matchesSearch;
    });

    displayNotices(filtered);
}

function showNotice(id) {

    const notice = notices.find(n => n.id === id);

    if (!notice) return;

    document.getElementById("modalTitle").textContent =
        notice.title;

    document.getElementById("modalCategory").textContent =
        notice.category;

    document.getElementById("modalNumber").textContent =
        "Circular Number: " + notice.number;

    document.getElementById("modalDate").textContent =
        "Published Date: " + notice.date;

    document.getElementById("modalDescription").textContent =
        notice.description;

    const urgentLabel = document.getElementById("modalUrgent");

    urgentLabel.style.display =
        notice.urgent ? "inline-block" : "none";

    const documents = document.getElementById("modalDocuments");

    documents.innerHTML = "";

    notice.documents.forEach(file => {

        const link = document.createElement("a");

        link.className = "document-link";

        link.href = "documents/" + encodeURIComponent(file);

        link.target = "_blank";

        link.textContent = "📄 " + file + " (View Document)";

        documents.appendChild(link);
    });

    document.getElementById("noticeModal").style.display =
        "flex";
}

function closeModal() {

    document.getElementById("noticeModal").style.display =
        "none";
}

window.addEventListener("click", function(event) {

    const modal = document.getElementById("noticeModal");

    if (event.target === modal) {
        closeModal();
    }

});

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeModal();
    }

});

document.getElementById("totalNotices").textContent =
    notices.length;

document.getElementById("urgentNotices").textContent =
    notices.filter(notice => notice.urgent).length;

displayNotices(notices);
