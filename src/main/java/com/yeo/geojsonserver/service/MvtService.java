/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.yeo.geojsonserver.service;

import com.yeo.geojsonserver.dao.MvtDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author yunusemreozkaya
 */


@Service
public class MvtService {
    
    @Autowired MvtDao mvtDao;
    
    public byte[] getPoints(int z, int x, int y, String layername){
        return this.mvtDao.getPoints(z,x,y,layername);
    }
}
