package com.Pahana_edu.Backend.service;

import com.Pahana_edu.Backend.entity.Order;
import com.Pahana_edu.Backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class CheckoutService {

    @Autowired
    private OrderRepository orderRepository;

    public Order placeOrder(Order orderRequest) {
        // Calculate subtotal
        BigDecimal subtotal = orderRequest.getItems().stream()
                .map(item -> item.getBookPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Discount (if any)
        BigDecimal discount = orderRequest.getDiscountAmount() != null ? orderRequest.getDiscountAmount() : BigDecimal.ZERO;

        // Shipping cost
        BigDecimal shipping = subtotal.compareTo(BigDecimal.valueOf(50)) > 0 ? BigDecimal.ZERO : BigDecimal.valueOf(5.99);

        // Total
        BigDecimal total = subtotal.subtract(discount).add(shipping);

        orderRequest.setSubtotal(subtotal);
        orderRequest.setShippingCost(shipping);
        orderRequest.setTotal(total);
        orderRequest.setStatus("PLACED");
        orderRequest.setCreatedAt(Instant.now());

        return orderRepository.save(orderRequest);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }



}
