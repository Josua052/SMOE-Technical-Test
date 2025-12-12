--
-- PostgreSQL database dump
--

\restrict TEMCXkpbP9vbfz5VA9dKMnQASvmZVu5QbmgsV3bXL1TGXCxQQumNbd4Ezo13pk6

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2025-12-10 16:08:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: material_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.material_details (
    id integer NOT NULL,
    request_id integer NOT NULL,
    material_code character varying,
    material_description character varying NOT NULL,
    material_type character varying NOT NULL,
    quantity numeric(12,2) NOT NULL,
    unit character varying NOT NULL,
    uom character varying,
    needed_date date NOT NULL,
    remarks text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.material_details OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: material_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.material_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.material_details_id_seq OWNER TO postgres;

--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 219
-- Name: material_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.material_details_id_seq OWNED BY public.material_details.id;


--
-- TOC entry 222 (class 1259 OID 16408)
-- Name: requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requests (
    id integer NOT NULL,
    request_no character varying NOT NULL,
    request_date date NOT NULL,
    requester character varying NOT NULL,
    department character varying NOT NULL,
    status character varying DEFAULT 'PENDING'::character varying NOT NULL,
    remarks text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.requests OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16407)
-- Name: requests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.requests_id_seq OWNER TO postgres;

--
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 221
-- Name: requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.requests_id_seq OWNED BY public.requests.id;


--
-- TOC entry 4861 (class 2604 OID 16393)
-- Name: material_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.material_details ALTER COLUMN id SET DEFAULT nextval('public.material_details_id_seq'::regclass);


--
-- TOC entry 4863 (class 2604 OID 16411)
-- Name: requests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests ALTER COLUMN id SET DEFAULT nextval('public.requests_id_seq'::regclass);


--
-- TOC entry 5022 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: material_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.material_details (id, request_id, material_code, material_description, material_type, quantity, unit, uom, needed_date, remarks, created_at) FROM stdin;
2	1	111212	Urgently	12	12.00	1	11	2025-12-10	\N	2025-12-10 16:05:35.930983
\.


--
-- TOC entry 5024 (class 0 OID 16408)
-- Dependencies: 222
-- Data for Name: requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.requests (id, request_no, request_date, requester, department, status, remarks, created_at, updated_at) FROM stdin;
1	MR-001	2025-12-10	Jo	Engineer	PENDING	Adding	2025-12-10 16:05:25.85145	2025-12-10 16:05:25.85145
\.


--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 219
-- Name: material_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.material_details_id_seq', 2, true);


--
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 221
-- Name: requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.requests_id_seq', 1, true);


--
-- TOC entry 4870 (class 2606 OID 16426)
-- Name: requests PK_0428f484e96f9e6a55955f29b5f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY (id);


--
-- TOC entry 4868 (class 2606 OID 16406)
-- Name: material_details PK_aceae3671264e9930ba7be942d6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.material_details
    ADD CONSTRAINT "PK_aceae3671264e9930ba7be942d6" PRIMARY KEY (id);


--
-- TOC entry 4872 (class 2606 OID 16428)
-- Name: requests UQ_3336c550ffaa3bccddd5589d5ae; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT "UQ_3336c550ffaa3bccddd5589d5ae" UNIQUE (request_no);


--
-- TOC entry 4873 (class 2606 OID 16429)
-- Name: material_details FK_91c670ab943e2d7515a58b0d8b1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.material_details
    ADD CONSTRAINT "FK_91c670ab943e2d7515a58b0d8b1" FOREIGN KEY (request_id) REFERENCES public.requests(id) ON DELETE CASCADE;


-- Completed on 2025-12-10 16:08:52

--
-- PostgreSQL database dump complete
--

\unrestrict TEMCXkpbP9vbfz5VA9dKMnQASvmZVu5QbmgsV3bXL1TGXCxQQumNbd4Ezo13pk6

