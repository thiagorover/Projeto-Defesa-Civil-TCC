package com.defesacivil.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.defesacivil.api.domain.Markup;

public interface MarkupRepository extends JpaRepository<Markup, Integer> {
}
