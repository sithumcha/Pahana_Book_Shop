package com.Pahana_edu.Backend.repository;

import com.Pahana_edu.Backend.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {


    List<Order> findByUserId(String userId);




}
