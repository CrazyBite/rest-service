package com.example.restservice.controller;

import com.example.restservice.service.TextService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TextController {

    /**
     * Service which works with files.
     */
    @Autowired
    TextService textService;

    /**
     * Main method which returns text to frontend.
     *
     * @param type big or small file
     * @return text
     */
    @GetMapping("/getText")
    public String greeting(@RequestParam(value = "type", defaultValue = "small") String type) {
        return textService.getText(type);
    }
}
