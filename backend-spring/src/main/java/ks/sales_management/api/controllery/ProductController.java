package ks.sales_management.api.controllery;

import ks.sales_management.api.model.Product;
import ks.sales_management.api.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;


    @GetMapping
    public ResponseEntity<Page<Product>> getOrders(@RequestParam(required = false) Integer page) {
        int pageNumber = (page != null && page >= 0) ? page : 0;
        Page<Product> products = productService.getProducts(pageNumber);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getSingleProduct(@PathVariable Long id) {
        Product singleProduct = productService.getSingleProduct(id);
        return ResponseEntity.ok(singleProduct);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<Product>> getFilteredProducts(
        @RequestParam(required = false) String nazwa,
        @RequestParam(required = false) String kategoria,
        @RequestParam(required = false) String model,
        @RequestParam(required = false) Double minCena,
        @RequestParam(required = false) Double maxCena,
        @RequestParam(required = false) Long idZamowienia,
        @RequestParam(required = false) Integer page) {

        int pageNumber = (page != null && page >= 0) ? page : 0;
        Page<Product> products = productService.getFilteredProducts(
                pageNumber, nazwa, kategoria, model, minCena, maxCena, idZamowienia);

        return ResponseEntity.ok(products);
    }


    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product, @PathVariable Long id) {
        Product updatedProduct = productService.updateProduct(product, id);
        return ResponseEntity.ok(updatedProduct);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.removeProduct(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/batch")
    public ResponseEntity<Void> deleteProducts(@RequestBody List<Long> ids) {
        productService.deleteProducts(ids);
        return ResponseEntity.noContent().build();
    }
}
