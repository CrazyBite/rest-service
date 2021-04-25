package com.example.restservice.service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TextService {

    /**
     * Paths to files
     */
    Map<String, String> filePath  = new HashMap<String, String>() {{
        put("big", "/bigFile.txt");
        put("small", "/smallFile.txt");
    }};

    /**
     * Open and read file.
     *
     * @param type big or small file
     * @return file text
     */
    public String getText(String type) {
        String path = filePath.get(type);
        InputStream is = getClass().getResourceAsStream(path);

        if (is == null) {
            return "File not found";
        }
        return new BufferedReader(
                new InputStreamReader(is, StandardCharsets.UTF_8))
                .lines()
                .collect(Collectors.joining("\n"));
    }
}
