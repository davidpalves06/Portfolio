package main

import (
	"log"

	"github.com/davidpalves06/HTTPGolang/easyhttp"
)

func main() {
	server, err := easyhttp.NewHTTPServer(":8080")

	if err != nil {
		log.Fatalln(err.Error())
	}

	server.HandleGET("/", easyhttp.FileServer("static/index/index.html"))
	server.HandleGET("/contact", easyhttp.FileServer("static/contact/contact.html"))
	server.HandleGET("/bio", easyhttp.FileServer("static/bio/bio.html"))
	server.HandleGET("/static/*", easyhttp.FileServerFromPath("static/"))
	server.HandleGET("*", easyhttp.FileServer("static/error/notfound.html"))

	server.Run()
}
