package main

import (
	"html/template"
	"log"
	"net/http"
)

func sendIndexPage(w http.ResponseWriter, r *http.Request) {
	log.Println("Index Page request received")

	if r.Method != "GET" {
		log.Println("Method not allowed. Request failed")
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-type", "text/html")
	html, err := template.ParseFiles("static/index/index.html")
	if err != nil {
		log.Println("Could not read file. Request failed")
		http.Error(w, "Internal Error", http.StatusInternalServerError)
		return
	}
	err = html.Execute(w, nil)
	if err != nil {
		log.Println("Could not send html. Request failed")
		http.Error(w, "Internal Error", http.StatusInternalServerError)
		return
	}
}

func main() {
	var server = http.Server{
		Addr: ":8080",
	}
	http.Handle("/static/", http.FileServer(http.Dir(".")))
	http.HandleFunc("/", sendIndexPage)

	server.ListenAndServe()
}
