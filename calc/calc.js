const excelToJson = require('convert-excel-to-json')
const fs = require('fs')
const moment = require('moment')

const normalize = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/ /g, '').toLowerCase()
} 

async function calc(year, exam) {
    let json = excelToJson({
        sourceFile: `./calc/sheets/${year}-${exam}.xlsx`,
        header: {
            rows: 2
        }
    })

    json = json[Object.keys(json)[0]]

    // map for better file size and svelte each stuffs
    let mapped = json.map(({ A, B, C, D, E, F, G, H, I, J, K, L, M }) => ([B, C, `${moment(D).add(1, "day").locale("vi").format("L")}`, E, F, G, H, I, J, K, L, M]))

    // fix dumb excel bug .10 to Oct *sign..
    mapped.forEach((score, index) => {
        if (Number(score[5]) > 10) {
            let date = new Date(score[5])
            scoreString = `${date.getDate() + 1}.${date.getMonth() + 1}`
            score[5] = scoreString
            mapped[index] = score
        }
        if (Number(score[7]) > 10) {
            let date = new Date(score[7])
            scoreString = `${date.getDate() + 1}.${date.getMonth() + 1}`
            score[7] = scoreString
            mapped[index] = score
        }
        if (Number(score[9]) > 10) {
            let date = new Date(score[9])
            scoreString = `${date.getDate() + 1}.${date.getMonth() + 1}`
            score[9] = scoreString
            mapped[index] = score
        }
        if (Number(score[11]) > 30) {
            let date = new Date(score[11])
            scoreString = `${date.getDate() + 1}.${date.getMonth() + 1}`
            score[11] = scoreString
            mapped[index] = score
        }
    })

    // sort by sbd
    // mapped.sort((a, b) => {
    //     if (a[1] < b[1]) return -1;
    //     if (a[1] > b[1]) return 1;
    //     return 0;
    // });
    // needless because the orginal excel is well-sorted tbh

    //indexes
    let indexes = []
    for await (const score of mapped) {
        if (!indexes.some(index => index.name === normalize(score[4]))) {
            indexes.push({
                name: normalize(score[4]),
                classes: []
            })
        }
        if (!indexes.some(index => index.name === normalize(score[4]) && index.classes.includes(score[3]))) {
            indexes[indexes.findIndex(index => index.name === normalize(score[4]))].classes.push(score[3])
        }
    } 
    mapped.unshift(indexes)

    // ~7000 rows *sign..
    let light = {
        half: [],
        quarter: []
    }
    // ~3000
    for (let i = 0; i < mapped.length; i++) {
        if (i % 2 === 0) {
            light.half.push(mapped[i])
        }
    }
    // ~1500
    for (let i = 0; i < mapped.length; i++) {
        if (i % 4 === 0) {
            light.quarter.push(mapped[i])
        }
    }

    fs.writeFileSync(`./data/${year}/${exam}.json`, JSON.stringify(mapped))
    fs.writeFileSync(`./data/${year}/${exam}-half.json`, JSON.stringify(light.half))
    fs.writeFileSync(`./data/${year}/${exam}-quarter.json`, JSON.stringify(light.quarter))
}

fs.readdirSync("./calc/sheets").forEach(file => {
    calc(file.split(".")[0].split("-")[0], file.split(".")[0].split("-")[1])
})