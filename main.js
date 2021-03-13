function dateHHMM() {
  let d = new Date()
  let minutes = d.getMinutes()
  if (minutes < 10) 
    return `${d.getHours()}:0${d.getMinutes()}`
  return `${d.getHours()}:${d.getMinutes()}`
}

var time = new Vue({
  el: '#time',
  data: {
    timestr: dateHHMM()
  }
})

var t = setInterval(function() { time.timestr = dateHHMM() }, 1000);

var du = new Vue({
  el: '#du',
  data: {
    disk1:  "0",
    disk2:  "0",
    total1: "0",
    total2: "0",
    used1:  "0",
    used2:  "0",
    perc1:  "0",
    perc2:  "0",
    cpu:   "0",
  }
})

fetch("du")
.then(data => { return data.json() })
.then(res => { 
  du.disk1 = res.disk1
  du.disk2 = res.disk2
  du.total1 = res.total1
  du.total2 = res.total2
  du.used1 = res.used1
  du.used2 = res.used2
  du.perc1 = res.perc1
  du.perc2 = res.perc2
  du.cpu = res.cpu
})

var sayform = new Vue({
  el: '#sayform',
  data: {
    words: null,
    voice: "Anna",
  }
})

