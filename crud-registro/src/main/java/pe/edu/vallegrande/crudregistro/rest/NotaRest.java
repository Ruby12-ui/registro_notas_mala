
package pe.edu.vallegrande.crudregistro.rest;

import pe.edu.vallegrande.crudregistro.model.Nota;
import pe.edu.vallegrande.crudregistro.service.NotaService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
@CrossOrigin(origins = "http://localhost:4200")
public class NotaRest {

    private final NotaService notaService;

    public NotaRest(NotaService notaService) {
        this.notaService = notaService;
    }

    @GetMapping
    public ResponseEntity<List<Nota>> listarTodas() {
        return ResponseEntity.ok(notaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nota> buscarPorId(
            @PathVariable Integer id) {
        return ResponseEntity.ok(notaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Nota> guardar(
            @RequestBody Nota nota) {
        Nota nuevaNota = notaService.guardar(nota);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(nuevaNota);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Nota> actualizar(
            @PathVariable Integer id,
            @RequestBody Nota nota) {
        return ResponseEntity.ok(
                notaService.actualizar(id, nota)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Integer id) {
        notaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
