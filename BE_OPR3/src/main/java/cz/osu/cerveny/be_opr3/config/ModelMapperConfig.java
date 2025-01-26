package cz.osu.cerveny.be_opr3.config;

import cz.osu.cerveny.be_opr3.model.entity.Note;
import cz.osu.cerveny.be_opr3.model.entity.User;
import cz.osu.cerveny.be_opr3.service.dto.note.NoteCreateDTO;
import cz.osu.cerveny.be_opr3.service.dto.note.NoteDTO;
import cz.osu.cerveny.be_opr3.service.dto.note.NoteUpdateDTO;
import cz.osu.cerveny.be_opr3.service.dto.user.UserCreateDTO;
import cz.osu.cerveny.be_opr3.service.dto.user.UserUpdateDTO;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setAmbiguityIgnored(true);
        modelMapper.getConfiguration().setDeepCopyEnabled(true);

        Converter<UserUpdateDTO, User> userUpdateConverter = context -> {
            UserUpdateDTO source = context.getSource();
            User destination = context.getDestination();

            if (source.getFirstName() != null && !source.getFirstName().isEmpty()) {
                destination.setFirstName(source.getFirstName());
            }
            if (source.getLastName() != null && !source.getLastName().isEmpty()) {
                destination.setLastName(source.getLastName());
            }

            return destination;
        };

        modelMapper.createTypeMap(UserCreateDTO.class, User.class)
                .addMappings(mapper -> mapper.skip(User::setId))
                .addMappings(mapper -> mapper.skip(User::setPassword));


        modelMapper.createTypeMap(UserUpdateDTO.class, User.class)
                .addMappings(mapper -> mapper.skip(User::setId))
                .addMappings(mapper -> mapper.skip(User::setPassword))
                .setPreConverter(userUpdateConverter);

        modelMapper.createTypeMap(NoteUpdateDTO.class, Note.class)
                .addMappings(mapper -> mapper.skip(Note::setId))
                .addMappings(mapper -> mapper.skip(Note::setOwnerOfTheNote))
        ;

        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

        Converter<String, LocalDateTime> toLocalDateTime = mappingContext -> {
            String source = mappingContext.getSource();
            return source != null ? LocalDateTime.parse(source, formatter) : LocalDateTime.now().plus(Duration.ofDays(7));
        };

        modelMapper.createTypeMap(NoteCreateDTO.class, Note.class)
                .addMappings(mapper -> mapper.using(toLocalDateTime).map(NoteCreateDTO::getExpirationDate, Note::setExpirationDate))
                .addMappings(mapper -> mapper.skip(Note::setImportancy))
                .addMappings(mapper -> mapper.skip(Note::setId));

        modelMapper.createTypeMap(Note.class, NoteDTO.class)
                .addMappings(mapper -> mapper.map(
                        src -> src.getCreatedDate() != null ? src.getCreatedDate().format(formatter) : null,
                        NoteDTO::setCreatedDate))
                .addMappings(mapper -> mapper.map(
                        src -> src.getExpirationDate() != null ? src.getExpirationDate().format(formatter) : null,
                        NoteDTO::setExpirationDate));

        return modelMapper;
    }
}