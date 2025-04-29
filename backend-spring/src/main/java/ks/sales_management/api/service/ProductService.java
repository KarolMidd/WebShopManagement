package ks.sales_management.api.service;

import jakarta.transaction.Transactional;
import ks.sales_management.api.exception.ClientNotFoundException;
import ks.sales_management.api.exception.OrderNotFoundException;
import ks.sales_management.api.exception.ProductNotFoundException;
import ks.sales_management.api.model.Client;
import ks.sales_management.api.model.Order;
import ks.sales_management.api.model.Product;
import ks.sales_management.api.repository.OrderRepo;
import ks.sales_management.api.repository.ProductRepo;
import ks.sales_management.api.specifications.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

import static ks.sales_management.api.exception.OrderNotFoundException.createOrderNotFoundMessage;
import static ks.sales_management.api.exception.ProductNotFoundException.createProductNotFoundMessage;

@Service
@RequiredArgsConstructor
public class ProductService {

    private static final int PAGE_SIZE = 25;

    private final ProductRepo productRepo;

    private final OrderRepo orderRepo;

    public Page<Product> getProducts(int page) {
        return productRepo.findAllProducts(PageRequest.of(page,PAGE_SIZE));
    }

    public Page<Product> getFilteredProducts(int page, String nazwa, String kategoria,
            String model, Double minCena, Double maxCena, Long idZamowienia) {
        Specification<Product> spec = Specification
                .where(ProductSpecification.hasNazwa(nazwa))
                .and(ProductSpecification.hasKategoria(kategoria))
                .and(ProductSpecification.hasModel(model))
                .and(ProductSpecification.hasCenaBetween(minCena,maxCena))
                .and(ProductSpecification.hasZamowienie(idZamowienia));
        return productRepo.findAll(spec, PageRequest.of(page, PAGE_SIZE));
    }

    public Product getSingleProduct(Long id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(createProductNotFoundMessage(id)));
    }

    public Product saveProduct(Product product) {
        Long idZamowienia = product.getIdZamowienia();
        if (idZamowienia != null) {
            Order existingOrder = orderRepo.findById(idZamowienia)
                    .orElseThrow(() -> new OrderNotFoundException(createOrderNotFoundMessage(idZamowienia)));
            return productRepo.save(product);
        }
        return productRepo.save(product);
    }

    public Product updateProduct(Product updatedProduct, Long id) {
        Product existingProduct = productRepo.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(createProductNotFoundMessage(id)));

        if (updatedProduct.getIdZamowienia() != null) {
            checkOrderExistence(updatedProduct.getIdZamowienia());
            existingProduct.setIdZamowienia(updatedProduct.getIdZamowienia());

        } else {
            existingProduct.setIdZamowienia(null);
        }

        existingProduct.setNazwa(updatedProduct.getNazwa());
        existingProduct.setKategoria(updatedProduct.getKategoria());
        existingProduct.setModel(updatedProduct.getModel());
        existingProduct.setCena(updatedProduct.getCena());

        Product savedProduct = productRepo.save(existingProduct);


        return savedProduct;
    }

    public void removeProduct(Long id) {
        Product productToRemove = productRepo.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(createProductNotFoundMessage(id)));

        productRepo.deleteById(id);
    }

    private void checkOrderExistence(Long orderId) {
        if (orderRepo.findById(orderId).isEmpty()) {
            throw new OrderNotFoundException(createOrderNotFoundMessage(orderId));
        }
    }

    public void deleteProducts(List<Long> ids) {
        for (Long id : ids)
        {
            removeProduct(id);
        }
    }
}

