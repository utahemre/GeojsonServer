/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.yeo.geojsonserver.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author yunusemreozkaya
 */
@Repository
public class GeojsonDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    static String geojsonTemplate = "SELECT jsonb_build_object('type', 'FeatureCollection', 'features', jsonb_agg(feature) "
                + ") FROM (SELECT jsonb_build_object('type', 'Feature', 'id', id,"
                + "'geometry', ST_AsGeoJSON(geom)::jsonb,'properties', to_jsonb(row) - 'geom'"
                + ") AS feature FROM (%s) row) features";

    
    public String getPoints() {
        return jdbcTemplate.queryForObject(String.format(geojsonTemplate, "select * from egitim_nokta"), String.class);
    }
    
    public String getLinestrings() {
        return jdbcTemplate.queryForObject(String.format(geojsonTemplate, "select * from egitim_cizgi"), String.class);
    }
    
    public String getPolygons() {
        return jdbcTemplate.queryForObject(String.format(geojsonTemplate, "select * from egitim_poligon"), String.class);
    }

}
