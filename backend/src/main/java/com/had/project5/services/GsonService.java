package com.had.project5.services;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;

import java.io.IOException;
import java.util.TimeZone;

import org.springframework.stereotype.Service;

@Service
public class GsonService {

    public static Gson createCustomGson() {
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(TimeZone.class, new TimeZoneAdapter());
        return gsonBuilder.create();
    }

    static class TimeZoneAdapter extends TypeAdapter<TimeZone> {
        @Override
        public void write(JsonWriter out, TimeZone value) throws IOException {
            if (value == null) {
                out.nullValue();
                return;
            }
            out.value(value.getID()); // Write the ID of the TimeZone
        }

        @Override
        public TimeZone read(JsonReader in) throws IOException {
            if (in.peek() == JsonToken.NULL) {
                in.nextNull();
                return null;
            }
            String id = in.nextString(); // Read the ID from JSON
            return TimeZone.getTimeZone(id);
        }
    }
}
