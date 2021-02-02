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
    disk:  "0",
    total: "0",
    used:  "0",
    free:  "0",
    perc:  "0",
  }
})

fetch("du")
.then(data => { return data.json() })
.then(res => { 
  du.disk = res.disk
  du.total = res.total
  du.used = res.used
  du.free = res.free
  du.perc = res.perc
})

var sayform = new Vue({
  el: '#sayform',
  data: {
    words: null,
    voice: null,
  }
})

