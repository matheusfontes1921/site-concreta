package com.app.entity;

        import jakarta.persistence.*;
        import lombok.AllArgsConstructor;
        import lombok.Getter;
        import lombok.NoArgsConstructor;
        import lombok.Setter;

        import java.util.ArrayList;
        import java.util.List;
        import java.util.UUID;

@Entity
@Table(name = "projetos")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Projeto {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String titulo;
    @Column(nullable = false, length = 2000)
    private String descricao;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "projeto_id")
    private final List<Imagem> listaImagens = new ArrayList<>();

    public Projeto(String titulo, String descricao) {
        this.titulo = titulo;
        this.descricao = descricao;
    }
}
