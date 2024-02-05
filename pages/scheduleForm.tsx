import { useRouter } from "next/router";
import Header from "./components/Header/Header";
import SubHeader from "./components/SubHeader/SubHeader";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AddPokemonButton,
  FieldWrapper,
  FormTitle,
  FormWrapper,
  InformationsWrapper,
  InsideTitle,
  PokemonFieldWrapper,
  PriceContainer,
  SubmitButtonWrapper,
  SubmitContainer,
  SubmittedStatusContainer,
  SubmittedStatusWrapper
} from "./scheduleForm.style";
import AddIcon from '@mui/icons-material/Add';
import CustomButton from "./components/CustomButton/CustomButton";
import Footer from "./components/Footer/Footer";
import {
  useGetDates,
  useGetTimes,
  useGetPokemons,
  useGetRegions,
  useGetLocations,
  usePostForm
} from "./hooks";
import { FormStatusType, ILocations, IPokemon, IRegion } from "./types";
import { formatSubTotal, formatValue } from "./library";
import { UNIT_VALUE } from "./constants";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import checkImage from '../public/check.svg';
import warnImage from '../public/warning.svg';
import Image from "next/image";

export default function ScheduleForm() {
  const router = useRouter();
  const { title } = router.query;
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [pokemons, setPokemons] = useState<IPokemon[]>();
  const [regions, setRegions] = useState<IRegion[]>();
  const [locations, setLocations] = useState<ILocations[]>();
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
  const [formStatus, setFormStatus] = useState<FormStatusType>("notSubmitted");

  const getDates = useGetDates();
  const getTimes = useGetTimes();
  const getPokemons = useGetPokemons();
  const getRegions = useGetRegions();
  const getLocations = useGetLocations();
  const postForm = usePostForm();

  const formattedValue = useMemo(() => formatValue(pokemonList.length), [pokemonList.length]);
  const formattedSubTotal = useMemo(() => formatSubTotal(pokemonList.length), [pokemonList.length]);

  const handleDates = useCallback(() => {
    getDates().then(dates => {
      setDates(dates);
    })
  }, [getDates]);

  const handleTimes = useCallback(() => {
    getTimes().then(times => {
      setTimes(times);
    })
  }, [getTimes]);

  const handlePokemons = useCallback(() => {
    getPokemons().then(pokemons => {
      setPokemons(pokemons);
    })
  }, [getPokemons]);

  const handleRegions = useCallback(() => {
    getRegions().then(regions => {
      setRegions(regions);
    })
  }, [getRegions]);

  const handleLocations = useCallback(() => {
    getLocations().then(locations => {
      setLocations(locations);
    })
  }, [getLocations]);

  useEffect(() => {
    handleDates();
    handleTimes();
    handlePokemons();
    handleRegions();
    handleLocations();
  }, [handleDates, handleTimes, handlePokemons, handleRegions, handleLocations]);

  const schema = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    surname: yup.string().required('Campo obrigatório'),
    region: yup.string().required('Selecione uma região'),
    city: yup.string().required('Selecione uma cidade'),
    pokemonList: yup.array().of(
      yup.object().shape({
        name: yup.string(),
        url: yup.string(),
      })
    ).min(1, 'Adicione pelo menos um Pokémon').max(6, 'Máximo de seis Pokémons atingido'),
    date: yup.string().required('Selecione uma Data'),
    hour: yup.string().required('Selecione um Horário'),
    total: yup.string(),
  });

  const { handleSubmit, control, formState, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const generateAppointmentInfo = useCallback(() => {
    const selectedDate = watch("date");
    const selectedHour = watch("hour");
    const numberOfPokemons = pokemonList.length;

    if (selectedDate && selectedHour && numberOfPokemons > 0) {
      return `No dia ${selectedDate} às ${selectedHour} para ${numberOfPokemons} pokémon${numberOfPokemons > 1 ? 's' : ''}`;
    }

    return "";
  }, [watch, pokemonList.length]);

  const addPokemonField = useCallback(() => {
    const selectedPokemon = pokemons?.find((option) => option.name === pokemonList[pokemonList.length - 1]?.name);

    const newPokemon = selectedPokemon
      ? { name: selectedPokemon.name, url: selectedPokemon.url }
      : { name: '', url: '' };

    setPokemonList([...pokemonList, newPokemon]);
  }, [pokemons, pokemonList]);

  const removePokemonField = useCallback((name: string) => {
    const updatedList = pokemonList.filter(pokemon => pokemon.name !== name);
    setPokemonList(updatedList);
  }, [pokemonList]);

  const updatePokemonList = (index: number, selectedPokemonName: string) => {
    setPokemonList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index] = {
        name: selectedPokemonName,
        url: pokemons?.find((p) => p.name === selectedPokemonName)?.url || '',
      };
      return updatedList;
    });
  };

  const onSubmit = useCallback(() => {
    if (formState.isValid) {
      postForm().then(response => {
        if (response) {
          setFormStatus('submitedTrue');
        } else {
          setFormStatus('submitedFalse');
        }
      })
    }
  }, [postForm, formState]);

  const backToForm = useCallback(() => {
    setFormStatus('notSubmitted');
  }, []);

  return (
    <>
      <Header />
      <SubHeader title={title} />

      {
        formStatus === 'notSubmitted' && (
          <>
            <FormTitle>Preencha o formulário abaixo para agendar sua consulta</FormTitle>
            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
              <InformationsWrapper>

                <FieldWrapper>
                  <label htmlFor="name">Nome</label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <input {...field} placeholder="Digite seu nome" />}
                  />
                  <p>{formState.errors.name?.message}</p>
                </FieldWrapper>

                <FieldWrapper>
                  <label htmlFor="surname">Sobrenome</label>
                  <Controller
                    name="surname"
                    control={control}
                    render={({ field }) => <input {...field} placeholder="Digite seu sobrenome" />}
                  />
                  <p>{formState.errors.surname?.message}</p>
                </FieldWrapper>

                <FieldWrapper>
                  <label htmlFor="region">Região</label>
                  <Controller
                    name="region"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select {...field} placeholder="Região">
                        <option value="" disabled selected>
                          Selecione uma região
                        </option>
                        {regions?.map((option) => (
                          <option key={option.name} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <p>{formState.errors.region?.message}</p>
                </FieldWrapper>

                <FieldWrapper>
                  <label htmlFor="city">Cidade</label>
                  <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select {...field}>
                        <option value="" disabled selected>
                          Selecione uma cidade
                        </option>
                        {locations?.map((option) => (
                          <option key={option.name} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <p>{formState.errors.city?.message}</p>
                </FieldWrapper>
              </InformationsWrapper>

              <div>
                <InsideTitle>
                  <h1>Cadastre seu time</h1>
                  <span>Atendemos até 06 pokémons por vez</span>
                </InsideTitle>

                {pokemonList.length > 0 && (
                  <div>
                    {pokemonList.map((pokemon, index) => (
                      <PokemonFieldWrapper key={pokemon.name}>
                        <label htmlFor={`pokemon-${index + 1}`}>{`Pokemon 0${index + 1}`}</label>
                        <Controller
                          name={`pokemonList[${index}].name`}
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <select
                              {...field}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                updatePokemonList(index, e.target.value);
                              }}
                              value={field.value as string}
                            >
                              <option value="" disabled selected>
                                Selecione um pokémon
                              </option>
                              {pokemons && pokemons.map((option) => (
                                <option key={option.name} value={option.name}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          )}
                        />
                        <p>{formState?.errors?.[`pokemon-${index}`]?.message}</p>
                        <RemoveCircleIcon onClick={() => removePokemonField(pokemon.name)} />
                      </PokemonFieldWrapper>
                    ))}
                  </div>
                )}


                <AddPokemonButton type="button" onClick={addPokemonField}>
                  Adicionar pokemon ao time...
                  <AddIcon />
                </AddPokemonButton>

                <InformationsWrapper>


                  <FieldWrapper>
                    <label htmlFor="date">Data para atendimentos</label>
                    <Controller
                      name="date"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <select {...field}>
                          <option value="" disabled selected>
                            Selecione uma data
                          </option>
                          {dates.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    <p>{formState.errors.city?.message}</p>
                  </FieldWrapper>


                  <FieldWrapper>
                    <label htmlFor="hour">Horario para atendimentos</label>
                    <Controller
                      name="hour"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <select {...field}>
                          <option value="" disabled selected>
                            Selecione um horário
                          </option>
                          {times.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    <p>{formState.errors.city?.message}</p>
                  </FieldWrapper>
                </InformationsWrapper>
              </div>

              <PriceContainer>
                <div>
                  <span>Número de pokémon a serem atendidos:</span>
                  <span>{`0${pokemonList.length}`}</span>
                </div>
                <div>
                  <span>Atendimento unitário por pokémon:</span>
                  <span>R$ {UNIT_VALUE},00</span>
                </div>
                <div>
                  <span>Subtotal:</span>
                  <span>{formattedSubTotal}</span>
                </div>
                <div>
                  <span>Taxa Geracional*:</span>
                  <span>R$ 2,10</span>
                </div>
                <span>Adicionamos uma taxa de 3%, multiplicado pelo número de geração mais alta do time, com limite de 30%.</span>
              </PriceContainer>

              <SubmitContainer>
                <span>Valor total: {pokemonList.length ? formattedValue : 'R$ 0,00'}</span>
                <SubmitButtonWrapper>
                  <CustomButton onClickCallback={onSubmit} label="Concluir Agendamento" />
                </SubmitButtonWrapper>
              </SubmitContainer>
            </FormWrapper>
          </>
        )
      }

      {
        formStatus === 'submitedTrue' && (
          <SubmittedStatusWrapper>
            <SubmittedStatusContainer>
              <h1>Consulta Agendada</h1>
              <Image alt="check" src={checkImage} />
              <span>{generateAppointmentInfo()} foi realizado com sucesso!</span>
              <CustomButton onClickCallback={backToForm} label="Fazer Novo Agendamento" />
            </SubmittedStatusContainer>
          </SubmittedStatusWrapper>
        )
      }

      {
        formStatus === 'submitedFalse' && (
          <SubmittedStatusWrapper>
            <SubmittedStatusContainer>
              <h1>Houve um problema no agendamento</h1>
              <Image alt="check" src={warnImage} />
              <span>Não foi possível realizar o agendamento</span>
              <CustomButton onClickCallback={backToForm} label="Fazer Novo Agendamento" />
            </SubmittedStatusContainer>
          </SubmittedStatusWrapper>
        )
      }
      <Footer />
    </>
  )
}