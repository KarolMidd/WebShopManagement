package ks.sales_management.api.controllery;

import ks.sales_management.api.model.Order;
import ks.sales_management.api.model.Product;
import ks.sales_management.api.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<Page<Order>> getOrders(@RequestParam(required = false) Integer page) {
        int pageNumber = (page != null && page >= 0) ? page : 0;
        Page<Order> orders = orderService.getOrders(pageNumber);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getSingleOrder(@PathVariable Long id) {
        Order singleOrder = orderService.getSingleOrder(id);
        return ResponseEntity.ok(singleOrder);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<Order>> getFilteredOrders(
            @RequestParam(required = false) Long idKlienta,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) LocalDateTime startDate,
            @RequestParam(required = false) LocalDateTime endDate,
            @RequestParam(required = false) Double minCena,
            @RequestParam(required = false) Double maxCena,
            @RequestParam(required = false) String dostawa,
            @RequestParam(required = false) String platnosc,
            @RequestParam(required = false) Boolean oplacone,
            @RequestParam(required = false) Integer page) {

        int pageNumber = (page != null && page >= 0) ? page : 0;
        Page<Order> orders = orderService.getFilteredOrders(
                pageNumber, idKlienta, status, startDate, endDate, minCena, maxCena,
                dostawa, platnosc, oplacone);

        return ResponseEntity.ok(orders);
    }

    @PostMapping
    public ResponseEntity<Order> addOrder(@RequestBody Order order)
    {
        Order savedOrder = orderService.saveOrder(order);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@RequestBody Order order, @PathVariable Long id) {
        Order updatedOrder = orderService.updateOrder(order, id);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/batch")
    public ResponseEntity<Void> deleteOrders(@RequestBody List<Long> ids) {
        orderService.deleteOrders(ids);
        return ResponseEntity.noContent().build();
    }
}
