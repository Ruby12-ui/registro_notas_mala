
package pe.edu.vallegrande.crudregistro.rest;

import pe.edu.vallegrande.crudregistro.model.Grado;
import pe.edu.vallegrande.crudregistro.service.GradoService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grados")
@CrossOrigin(origins = "http://localhost:4200")
public class GradoRest {

    private final GradoService gradoService;

    public GradoRest(GradoService gradoService) {
        this.gradoService = gradoService;
    }

    @GetMapping
    public ResponseEntity<List<Grado>> listarTodos() {
        return ResponseEntity.ok(gradoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Grado> buscarPorId(
            @PathVariable Integer id) {
        return ResponseEntity.ok(gradoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Grado> guardar(
            @RequestBody Grado grado) {
        Grado nuevo = gradoService.guardar(grado);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Grado> actualizar(
            @PathVariable Integer id,
            @RequestBody Grado grado) {
        return ResponseEntity.ok(
                gradoService.actualizar(id, grado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Integer id) {
        gradoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
