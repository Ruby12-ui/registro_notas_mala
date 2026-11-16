
package pe.edu.vallegrande.crudregistro.rest;

import pe.edu.vallegrande.crudregistro.model.Seccion;
import pe.edu.vallegrande.crudregistro.service.SeccionService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/secciones")
@CrossOrigin(origins = "http://localhost:4200")
public class SeccionRest {

    private final SeccionService seccionService;

    public SeccionRest(SeccionService seccionService) {
        this.seccionService = seccionService;
    }

    @GetMapping
    public ResponseEntity<List<Seccion>> listarTodas() {
        return ResponseEntity.ok(seccionService.listarTodas());
    }

    @GetMapping("/grado/{gradoId}")
    public ResponseEntity<List<Seccion>> listarPorGrado(
            @PathVariable Integer gradoId) {
        return ResponseEntity.ok(
                seccionService.listarPorGrado(gradoId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seccion> buscarPorId(
            @PathVariable Integer id) {
        return ResponseEntity.ok(
                seccionService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Seccion> guardar(
            @RequestBody Seccion seccion) {
        Seccion nueva = seccionService.guardar(seccion);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(nueva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Seccion> actualizar(
            @PathVariable Integer id,
            @RequestBody Seccion seccion) {
        return ResponseEntity.ok(
                seccionService.actualizar(id, seccion));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Integer id) {
        seccionService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
