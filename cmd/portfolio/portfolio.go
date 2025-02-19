package main

import (
	"fmt"
	"log"
	"net/url"
	"os"
	"strings"

	"github.com/davidpalves06/easyhttp"
)

func handleMessage(request easyhttp.ServerHTTPRequest, response *easyhttp.ServerHTTPResponse) {
	response.SetStatus(easyhttp.STATUS_OK)
	var entryMap = make(map[string]string)

	formData := string(request.Body)
	splittedForm := strings.Split(formData, "&")
	for _, entry := range splittedForm {
		splittedEntry := strings.Split(entry, "=")
		var key, err = url.QueryUnescape(splittedEntry[0])
		if err != nil {
			response.SetStatus(easyhttp.STATUS_BAD_REQUEST)
		}
		value, err := url.QueryUnescape(splittedEntry[1])
		if err != nil {
			response.SetStatus(easyhttp.STATUS_BAD_REQUEST)
		}
		entryMap[key] = value
	}

	if entryMap["from"] == "" || entryMap["title"] == "" || entryMap["message"] == "" {
		response.SetStatus(easyhttp.STATUS_BAD_REQUEST)
		return
	}
	messageFile, err := os.OpenFile("messages.txt", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		response.SetStatus(easyhttp.STATUS_INTERNAL_ERROR)
		return
	}
	defer messageFile.Close()

	var messageBuilder = new(strings.Builder)

	messageBuilder.WriteString(fmt.Sprintf("Message From: %s\r\n", entryMap["from"]))
	messageBuilder.WriteString(fmt.Sprintf("Title: %s\r\n", entryMap["title"]))
	messageBuilder.WriteString(fmt.Sprintf("Message: %s\r\n", entryMap["message"]))
	messageBuilder.WriteString("--------------------------------------------------\r\n")
	_, err = messageFile.WriteString(messageBuilder.String())
	if err != nil {
		response.SetStatus(easyhttp.STATUS_INTERNAL_ERROR)
		return
	}

}

func main() {
	server, err := easyhttp.NewHTTPServer(":80")

	if err != nil {
		log.Fatalln(err.Error())
	}

	server.HandleGET("/contact", easyhttp.FileServer("static/contact/contact.html"))
	// server.HandleGET("/bio", easyhttp.FileServer("static/bio/bio.html"))
	server.HandleGET("/static/contact/*", easyhttp.FileServerFromPath("static/contact"))
	// server.HandleGET("/static/bio/*", easyhttp.FileServerFromPath("static/bio"))
	server.HandleGET("/static/index/*", easyhttp.FileServerFromPath("static/index"))
	server.HandleGET("/static/assets/*", easyhttp.FileServerFromPath("static/assets"))
	server.HandleGET("/static/*", easyhttp.FileServerFromPath("static/"))
	server.HandlePOST("/message", handleMessage)
	server.HandleGET("/", easyhttp.FileServer("static/index/index.html"))
	server.HandleGET("*", easyhttp.FileServer("static/error/notfound.html"))

	server.Run()
}
