
package pe.edu.vallegrande.crudregistro.rest;

import pe.edu.vallegrande.crudregistro.model.Estudiante;
import pe.edu.vallegrande.crudregistro.service.EstudianteService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estudiantes")
@CrossOrigin(origins = "http://localhost:4200")
public class EstudianteRest {

    private final EstudianteService estudianteService;

    public EstudianteRest(EstudianteService estudianteService) {
        this.estudianteService = estudianteService;
    }

    @GetMapping
    public ResponseEntity<List<Estudiante>> listarTodos() {
        return ResponseEntity.ok(estudianteService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> buscarPorId(@PathVariable Integer id) {
        return estudianteService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Estudiante> crear(
            @Valid @RequestBody Estudiante estudiante) {
        Estudiante nuevo = estudianteService.guardar(estudiante);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Estudiante> actualizar(
            @PathVariable Integer id,
            @Valid @RequestBody Estudiante estudiante) {
        return estudianteService.actualizar(id, estudiante)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        return estudianteService.eliminar(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
