/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.yeo.geojsonserver.controller;

import com.yeo.geojsonserver.service.GeojsonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author yunusemreozkaya
 */

@RestController
@RequestMapping(value = "/geojson", produces = {MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8"})
public class GeojsonController {
    
    @Autowired GeojsonService geojsonService;
    
    @RequestMapping(value = "/getPoints", method = RequestMethod.GET)
    public String getPoints(){
        return this.geojsonService.getPoints();
    }
    
    @RequestMapping(value = "/getLinestrings", method = RequestMethod.GET)
    public String getLinestrings(){
        return this.geojsonService.getLinestrings();
    }
    
    @RequestMapping(value = "/getPolygons", method = RequestMethod.GET)
    public String getPolygons(){
        return this.geojsonService.getPolygons();
    }
    
    @RequestMapping(value = "/getPointPolygons", method = RequestMethod.GET)
    public String getPointPolygons(@RequestParam("city") String city){
        return this.geojsonService.getPointPolygons(city);
    }
    
}
