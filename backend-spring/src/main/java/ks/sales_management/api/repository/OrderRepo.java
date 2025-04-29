package ks.sales_management.api.repository;

import ks.sales_management.api.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;



@Repository
public interface OrderRepo extends JpaRepository <Order, Long>, JpaSpecificationExecutor<Order> {

    @Query("select o From Order o")
    Page<Order> findAllOrders(Pageable pageable);
}
