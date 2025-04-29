package ks.sales_management.api.service;

import jakarta.transaction.Transactional;
import ks.sales_management.api.exception.ClientNotFoundException;
import ks.sales_management.api.exception.OrderNotFoundException;
import ks.sales_management.api.model.Client;
import ks.sales_management.api.model.Product;
import ks.sales_management.api.repository.ClientRepo;
import ks.sales_management.api.repository.OrderRepo;
import ks.sales_management.api.repository.ProductRepo;
import ks.sales_management.api.specifications.OrderSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ks.sales_management.api.model.Order;

import java.time.LocalDateTime;
import java.util.List;

import static ks.sales_management.api.exception.ClientNotFoundException.createClientNotFoundMessage;
import static ks.sales_management.api.exception.OrderNotFoundException.createOrderNotFoundMessage;

@Service
@RequiredArgsConstructor
public class OrderService {

    private static final int PAGE_SIZE = 25;

    private final OrderRepo orderRepo;

    private final ClientRepo clientRepo;

    private final ProductRepo productRepo;


    public Page<Order> getOrders(int page) {
        return orderRepo.findAllOrders(PageRequest.of(page, PAGE_SIZE));
    }

    public Order getSingleOrder(Long id) {
        return orderRepo.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(createOrderNotFoundMessage(id)));
    }

    public Page<Order> getFilteredOrders(int page, Long idKlienta, String status,
             LocalDateTime startDate, LocalDateTime endDate, Double minKwota, Double maxKwota,
             String dostawa, String platnosc, Boolean oplacone) {
        Specification<Order> spec = Specification
                .where(OrderSpecification.hasIdKlienta(idKlienta))
                .and(OrderSpecification.hasStatus(status))
                .and(OrderSpecification.hasDataZlozeniaBetween(startDate, endDate))
                .and(OrderSpecification.hasKwotaCalkowitaBetween(minKwota, maxKwota))
                .and(OrderSpecification.hasDostawa(dostawa))
                .and(OrderSpecification.hasPlatnosc(platnosc))
                .and(OrderSpecification.isOplacone(oplacone));

        return orderRepo.findAll(spec, PageRequest.of(page, PAGE_SIZE));

    }

        public Order saveOrder(Order order) {
            if (order.getIdKlienta() == null) {
                throw new ClientNotFoundException("Nie podano ID klienta.");
            }

            Long idKlienta = order.getIdKlienta();
            Client existingClient = clientRepo.findById(idKlienta)
                    .orElseThrow(() -> new ClientNotFoundException(createClientNotFoundMessage(idKlienta)));

            return orderRepo.save(order);
        }

    public Order updateOrder(Order updatedOrder, Long id) {
        Order existingOrder = orderRepo.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(createOrderNotFoundMessage(id)));

        checkClientExistence(updatedOrder.getIdKlienta());

        existingOrder.setIdKlienta(updatedOrder.getIdKlienta());
        existingOrder.setStatus(updatedOrder.getStatus());
        existingOrder.setDataZlozenia(updatedOrder.getDataZlozenia());
        existingOrder.setKwotaCalkowita(updatedOrder.getKwotaCalkowita());
        existingOrder.setDostawa(updatedOrder.getDostawa());
        existingOrder.setPlatnosc(updatedOrder.getPlatnosc());
        existingOrder.setOplacone(updatedOrder.getOplacone());

        return orderRepo.save(existingOrder);
    }

    private void checkClientExistence(Long clientId) {
        if (clientRepo.findById(clientId).isEmpty()) {
            throw new ClientNotFoundException(createClientNotFoundMessage(clientId));
        }
    }

    public void deleteOrder(Long id) {
        if (orderRepo.existsById(id)) {
            orderRepo.deleteById(id);
        }
        else {
            throw new OrderNotFoundException(createOrderNotFoundMessage(id));
        }
    }

    public void deleteOrders(List<Long> ids) {
        for (Long id : ids)
        {
            deleteOrder(id);
        }
    }
}
