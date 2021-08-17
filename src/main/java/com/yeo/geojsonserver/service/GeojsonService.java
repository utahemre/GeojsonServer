/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.yeo.geojsonserver.service;

import com.yeo.geojsonserver.dao.GeojsonDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author yunusemreozkaya
 */


@Service
public class GeojsonService {
    
    @Autowired GeojsonDao geojsonDao;
    
    public String getPoints(){
        return this.geojsonDao.getPoints();
    }
    
    public String getLinestrings(){
        return this.geojsonDao.getLinestrings();
    }
    
    public String getPolygons(){
        return this.geojsonDao.getPolygons();
    }
    
}
