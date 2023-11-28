const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

var request = new XMLHttpRequest()
request.open(GET https://www.googleapis.com/books/v1/users/userId/bookshelves/1)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const h1 = document.createElement('h1')
      h1.textContent = title

      
}

request.send()
