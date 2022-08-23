/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.yeo.geojsonserver.controller;

import com.yeo.geojsonserver.service.GeojsonService;
import com.yeo.geojsonserver.service.MvtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author yunusemreozkaya
 */
@RestController
@RequestMapping(value = "/mvt", produces = {"application/x-protobuf"})
public class MvtController {

    @Autowired
    MvtService mvtService;

    @RequestMapping(value = "/{z}/{x}/{y}.pbf", method = RequestMethod.GET)
    public byte[] getPoints(@PathVariable int z, @PathVariable int x, @PathVariable int y, @RequestParam("layername") String layername) {
        return this.mvtService.getPoints(z, x, y, layername);
    }

}
