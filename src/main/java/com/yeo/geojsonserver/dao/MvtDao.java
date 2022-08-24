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
public class MvtDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    static String mvtTemplate = "WITH mvtgeom AS"
            + " ("
            + " SELECT ST_AsMVTGeom(geom, ST_Transform(ST_TileEnvelope(%s, %s, %s),4326), extent => 4096, buffer => 64) AS geom, %s"
            + " FROM"
            + " ("
            + " %s"
            + " ) original"
            + " WHERE geom && ST_Transform(ST_TileEnvelope(%s, %s, %s, margin => (64.0 / 4096)),4326)"
            + " )"
            + " SELECT ST_AsMVT(mvtgeom.*,'%s')"
            + " FROM mvtgeom";

    public byte[] getPoints(int z, int x, int y, String layername) {
        String query = "select * from poi";
        String attributes = "adi, mahalle,tipi";
        return jdbcTemplate.queryForObject(String.format(mvtTemplate, z, x, y, attributes, query, z, x, y, layername), byte[].class);
    }

}
