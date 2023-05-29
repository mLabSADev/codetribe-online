const fs = require("fs")
// Keketso wrote this PDNE
// title#id#duration
const lessons = [
  {
    name: "one",
    files: [
      "Course Introduction#Hu5ggNEcZjk#4:45",
      "Lesson Introduction#46DkC0Q_aX8#1:01",
      "React JS Overview and installation#GNLhteMB40w#6:11",
    ],
  },
  {
    name: "two",
    files: [
      "Lesson Introduction#yFuMzSkHGLQ#1:32",
      "Add transaction form UI component#Oq7hiZhZqSU#5:22",
      "Styling a Form#ihhDAwWO_bg#7:27",
      "Adding data to array#ihhDAwWO_bg#7:27",
      "Displaying data from array#IaiqDMZAavQ#6:51",
      "Styling ListItem from the Array#ZX1HjUwyRPg#10:15",
    ],
  },
  {
    name: "three",
    files: [
      "Lesson Introduction#eQ4XVcHjtek#1:15",
      "Setting up react routes#Aivly2lNa94#10:23",
      "Navigating from one to another page using useHistory hook#qXIJVtiDaWk#8:04",
      "No page found#3rqSoq88MmI#2:41",
    ],
  },
  {
    name: "four",
    files: [
      "Lesson Introduction#h6qyTkog6Eg#0:59",
      "Connecting Firebase to React Project#fP7XxNkp_NE#4:15",
      "Firebase authentication Sign Up#JC2Tdh_5S0U#13:30",
      "Firebase authentication Sign In#sgUz76P0xf4#7:45",
      "Firebase authentication Sign Out#PUuuCv4O8Ts#12:43",
      "Firebase authentication reset password#63N_7K8Jud0#8:34",
      "Firebase Firestore adding data#d7XtUvplwYE#5:37",
      "Firebase Firestore retrieving data#T7pz0hNvbN4#5:37",
    ],
  },
  {
    name: "five",
    files: [
      "Lesson Introduction#wFTzbGowRM4#1:03",
      "UI for currency convert#eco28MGR7wA#13:38",
      "Fetching data from api and setting up Currency options#ZU8E1iUrf-I#8:36",
      "Converting one currency to another#nYmqAmyAnvI#17:54",
    ],
  },
]
const test = [
  {
    name: "test",
    files: [
      "Lesson Introduction#wFTzbGowRM4#1:03",
      "UI for currency convert#eco28MGR7wA#13:38",
      "Fetching data from api and setting up Currency options#ZU8E1iUrf-I#8:36",
      "Converting one currency to another#nYmqAmyAnvI#17:54",
    ],
  },
]

const lessonSix = [
  "Lesson Introduction#gbQb9dnXGgg#0:57",
  "Firebase authentication sign up redux toolkit#J3yauQSOY2s#15:51",
  "Firebase authentication SigningOut with Redux#1mm13VY4Ojw#7:09",
  "Firebase authentication Signing Out redux#EyXTQt1KEwI#4:43",
  "Firebase authentication Password Reset Redux#cRv1tm6GX3Y#5:13",
  "Adding data to firebase with redux toolkit#tHJnYws7OKw#11:47",
  "Retrieving data from firebase using redux#Bo_bGBAc1l8#16:20",
  "Fixing adding to firebase using redux#MITi0MJAu7o#7:01",
  "Total Balance UI conponent#IvnoJRQj8YA#0:09",
  "Get total income and expense#kcrnJl_bPPc#5:51",
  "Fixing style#l846rdDS1Sc#11:52",
  "Adding delete and update bootstrap icons#XXs82H09Yjo#4:16",
  "Delete from firebase using redux#WGKBJb_ob24#8:48",
  "Update transaction using Modal#_fwENulVRb8#5:44",
]
const createFile = (
  slug,
  title,
  lesson,
  duration,
  id,
  chapterName,
  chapterNumber
) => {
  fs.writeFile(
    `./lessons/react/lesson-${chapterName}/${slug}.md`,
    `---
title: ${title}
date: 2023-05-24
chapter: ${chapterNumber}
lesson: ${lesson}
duration: "${duration}"
---
<iframe width="100%" height="600" src="https://www.youtube.com/embed/${id}" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

`,
    { encoding: "utf-8", flag: "w" },
    err => {
      if (err) {
        console.log("Error writing file", err)
      }
    }
  )
}
const main = () => {
  lessons.forEach((lesson, lessonIndex) => {
    const chapter = lessonIndex + 1
    lesson.files.forEach((file, fileIndex) => {
      const a = file
      const split = a.split("#")
      const b = split[0].replaceAll(" ", "-").toLocaleLowerCase()

      // title[0]#id[1]#duration[2]
      createFile(
        b,
        split[0],
        fileIndex + 1,
        split[2],
        split[1],
        lesson.name,
        chapter
      )
    })
  })
}

main()
