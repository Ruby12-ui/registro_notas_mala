
package pe.edu.vallegrande.crudregistro.rest;

import pe.edu.vallegrande.crudregistro.model.AsignacionDocente;
import pe.edu.vallegrande.crudregistro.service.AsignacionDocenteService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asignaciones-docentes")
@CrossOrigin(origins = "http://localhost:4200")
public class AsignacionDocenteRest {

    private final AsignacionDocenteService service;

    public AsignacionDocenteRest(
            AsignacionDocenteService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<AsignacionDocente>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AsignacionDocente> buscarPorId(
            @PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<AsignacionDocente> guardar(
            @RequestBody AsignacionDocente asignacion) {

        AsignacionDocente nueva = service.guardar(asignacion);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(nueva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AsignacionDocente> actualizar(
            @PathVariable Integer id,
            @RequestBody AsignacionDocente asignacion) {

        return ResponseEntity.ok(
                service.actualizar(id, asignacion));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Integer id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
