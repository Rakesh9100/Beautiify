const techSkills = [
    "AWS", "Azure", "Artificial Intelligence", "Android Development", "Ansible", "Agile Development", "Automation",
    "Blockchain", "Big Data", "Bootstrap", "Back-end Development", "Bash", "Business Intelligence", "Bluetooth",
    "C++", "C#", "Cloud Computing", "Cybersecurity", "Cryptography", "CSS", "Continuous Integration",
    "Docker", "Data Analysis", "Data Science", "Data Structures", "DevOps", "Django", "Database Management",
    "Excel", "Ethical Hacking", "E-commerce Development", "Elasticsearch", "Embedded Systems", "ETL (Extract, Transform, Load)", "Express.js",
    "Figma", "Firebase", "Front-end Development", "Fortran", "Functional Programming", "Flutter", "Firmware Development",
    "Google Cloud", "Git", "GraphQL", "Go", "Game Development", "GIS (Geographic Information Systems)", "GPU Programming",
    "HTML", "Hadoop", "Haskell", "Hybrid App Development", "Hyper-V", "HTML5", "HBase",
    "iOS Development", "IoT (Internet of Things)", "Information Security", "Integration Testing", "Informatica", "IT Support", "Infrastructure as Code"
];
let suggestions = [], selectedSkills = []
const dropdown_list = document.querySelector(".dropdown-list")
const selected_list = document.querySelector(".dropdown-control .left")
const dropdown_toggle = document.querySelector(".dropdown-control .right")

document.addEventListener("DOMContentLoaded", () => {
    loadSelectedSkills()
    dropdown_toggle.addEventListener("click", () => {
        toggleDropDown()
    })
})

function loadSuggestions() {
    dropdown_list.innerHTML = ``;

    suggestions.map((skill) => {
        const list_item = document.createElement("div")
        list_item.setAttribute("class", "list-item")

        if (selectedSkills.includes(skill)) {
            list_item.innerHTML = `<span>${skill}</span><i class="fa fa-check"></i>`
        } else {
            list_item.innerHTML = `<span>${skill}</span>`
        }

        list_item.addEventListener("click", () => {
            selectItem(skill)
        })

        dropdown_list.appendChild(list_item)
    })
}

function loadSelectedSkills() {
    selected_list.innerHTML = ``

    selectedSkills.map((skill) => {
        const selected_item = document.createElement("div")
        selected_item.setAttribute("class", "selected-item")

        selected_item.innerHTML = `<span>${skill}</span>`

        const remove_icon = document.createElement("i")
        remove_icon.setAttribute("class", "fa fa-times")

        remove_icon.addEventListener("click", () => {
            setSelectedSkills(selectedSkills.filter((sk) => sk != skill))
        })

        selected_item.append(remove_icon)

        selected_list.appendChild(selected_item)
    })

    const input = createInputElement()

    selected_list.appendChild(input)
}

function toggleDropDown() {
    if (suggestions.length === 0) {
        setSuggestions(techSkills)
    } else {
        setSuggestions([])
    }
}

function selectItem(skill) {
    if (selectedSkills.includes(skill)) {
        setSelectedSkills(selectedSkills.filter((sk) => sk != skill))
    } else {
        setSelectedSkills([...selectedSkills, skill])
    }
}

function setSuggestions(newSuggestions) {
    suggestions = newSuggestions
    loadSuggestions()
}

function setSelectedSkills(newSelectedSkills) {
    selectedSkills = newSelectedSkills
    loadSelectedSkills()
    setSuggestions([])
}

function createInputElement() {
    const input = document.createElement("input")
    input.setAttribute("type", "text")
    input.setAttribute("placeholder", "search skills")

    input.addEventListener("keyup", () => {
        if (input.value === "") {
            setSuggestions([])
        } else {
            setSuggestions(techSkills.filter((skill) => skill.toLowerCase().startsWith(input.value.toLowerCase())))
        }
    })

    return input;
}

