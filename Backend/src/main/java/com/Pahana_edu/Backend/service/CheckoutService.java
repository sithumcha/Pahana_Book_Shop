package com.Pahana_edu.Backend.service;

import com.Pahana_edu.Backend.entity.Order;
import com.Pahana_edu.Backend.entity.User;
import com.Pahana_edu.Backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CheckoutService {

    @Autowired
    private OrderRepository orderRepository;

    // Place an order
    public Order placeOrder(Order orderRequest) {
        BigDecimal subtotal = orderRequest.getItems().stream()
                .map(item -> item.getBookPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal discount = orderRequest.getDiscountAmount() != null ? orderRequest.getDiscountAmount() : BigDecimal.ZERO;
        BigDecimal shipping = subtotal.compareTo(BigDecimal.valueOf(50)) > 0 ? BigDecimal.ZERO : BigDecimal.valueOf(5.99);
        BigDecimal total = subtotal.subtract(discount).add(shipping);

        orderRequest.setSubtotal(subtotal);
        orderRequest.setShippingCost(shipping);
        orderRequest.setTotal(total);
        orderRequest.setStatus("PLACED");
        orderRequest.setCreatedAt(Instant.now());

        return orderRepository.save(orderRequest);
    }

    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get order by ID
    public Order getOrderById(String id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }



    // Update an order by ID
    public Order updateOrder(String id, Order updatedOrder) {
        Order existing = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        // Update status to CONFIRMED
        existing.setStatus(updatedOrder.getStatus());
        return orderRepository.save(existing);
    }

    // Delete an order by ID
    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }


    // Get confirmed orders by user ID
    public List<Order> getConfirmedOrdersByUserId(String userId) {
        return orderRepository.findAll().stream()
                .filter(order -> order.getUserId().equals(userId) && order.getStatus().equals("CONFIRMED"))
                .collect(Collectors.toList());
    }

}
